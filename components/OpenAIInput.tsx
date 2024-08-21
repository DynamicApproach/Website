/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useState, useEffect } from "react";
import OpenAI from "openai";
import PropTypes from "prop-types";
import OpenAIInputProps from "components/openai/OpenAIInputProps";
import formatData from "components/openai/formatData";
import getNodePath from "components/openai/getNodePath";
import appendMarkdown from "components/openai/appendMarkdown";
import modifyMarkdown from "./openai/modifyMarkdown";
import { HfInference } from "@huggingface/inference";

const NEXT_PUBLIC_Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const NEXT_PUBLIC_deploymentKey = process.env.DEPLOYMENT_KEY;
const OpenAIInput: React.FC<OpenAIInputProps> = ({
  onResponse,
  nodeData,
  onInputSubmit,

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClear = () => {}, // Default value to avoid calling undefined
  existingMarkdown
}) => {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState<Map<string, string>>(new Map());
  const [selectedAPI, setSelectedAPI] = useState("GPT4");
  const [isLoading, setIsLoading] = useState(false);
  const [newMapInput, setNewMapInput] = useState("");
  const [newMap, setNewMap] = useState("");
  const [lastResponse, setLastResponse] = useState("");

  const handleApiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAPI(e.target.value);
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleNewMapChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewMapInput(e.target.value);
  };
  const fetchFromServer = async (body: unknown) => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data from server:", error);
      throw error;
    }
  };

  const fetchAndAppendData = async (inputData: string) => {
    setIsLoading(true);
    console.log("Appending Data");
    let updatedResponse = "";
    try {
      if (!inputData) {
        console.error("Input data is null or empty");
        return;
      }
      const prompt =
        "Please give me an extremely detailed text based mind map of " +
        inputData +
        " in Markdown format, using * for list. Go deep rather than wide please but please" +
        " Only give me responses in this format.  \n";

      const result = await fetchFromServer({
        prompt: prompt,
        model: "gpt-4", // or any other model you want to use
        max_tokens: 10000 // or any other value
        // CHANGE THESE IF YOU WANT TO USE THIS LOCAL
      });

      console.log("OpenAI API response:", result);
      console.log(result);
      const choices = result.choices;
      const text = choices[0].message.content ?? result.content ?? "";
      if (text !== null) {
        updatedResponse = appendMarkdown(existingMarkdown, inputData, text);
        setResponses((prevResponses) => {
          const newResponses = new Map(prevResponses);
          newResponses.set(inputData, updatedResponse);
          return newResponses;
        });
        setLastResponse(updatedResponse);
        onResponse(updatedResponse);
      } else {
        console.error("Received null response text");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
    setIsLoading(false);
    return updatedResponse;
  };
  useEffect(() => {
    // For each response, apply the modifyMarkdown function
    responses.forEach((response, node) => {
      modifyMarkdown(existingMarkdown, node, response);
    });
  }, [existingMarkdown, responses]);

  const fetchData = async (inputData: string) => {
    setIsLoading(true);
    let updatedResponse = "";

    try {
      const nodePath = getNodePath(existingMarkdown, inputData);
      const promptBase = existingMarkdown
        ? `Please give me an extremely detailed text based mind map of the last item in this list ${nodePath}`
        : `Please give me an extremely detailed text based mind map of the last item in this list ${nodePath}`;
      const prompt = `${promptBase} in Markdown format, using * for lists.
       Please go deep rather than wide but ONLY give me responses in this specific markdown format. Supply at least 6 top level nodes and 20 sub-nodes each.\n`;

      const result = await fetchFromServer({
        prompt: prompt,
        model: selectedAPI === "openai" ? "chatgpt-4o-latest" : "gpt-4o",
        max_tokens: selectedAPI === "openai" ? 16000 : 4096
      });

      console.log("OpenAI API response:", result);
      const text = result.content ?? "";
      if (text) {
        updatedResponse = modifyMarkdown(existingMarkdown, inputData, text);
        setResponses((prevResponses) =>
          new Map(prevResponses).set(inputData, updatedResponse)
        );
        setLastResponse(updatedResponse);
        onResponse(updatedResponse);
      } else {
        console.error("Received null response text");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }

    setIsLoading(false);
    return updatedResponse || "";
  };

  const handleNewMapSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchAndAppendData(input); // Do not immediately update newMap
  };
  const handleNodeClick = (node: string) => {
    const response = responses.get(node);
    if (response) {
      const updatedMarkdown = modifyMarkdown(existingMarkdown, node, response);
      onResponse(updatedMarkdown);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchData(input); // Do not immediately update responses and do not trigger onInputSubmit
  };

  const clearMap = () => {
    console.log("attempt clear map");
    setInput("");
    setResponses(new Map());
    onResponse("");
    onClear();
  };

  useEffect(() => {
    console.log(nodeData);
    if (nodeData) {
      const nodeDataObj =
        typeof nodeData === "string" ? JSON.parse(nodeData) : nodeData;
      fetchData(nodeDataObj.content);
    }
  }, [nodeData]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="input" className="block text-white">
          Enter a topic:
        </label>
        <input
          type="text"
          id="input"
          name="input"
          value={input}
          onChange={handleChange}
          className="w-full"
        />
        <div className="space-x-2">
          <label htmlFor="api" className="block text-white">
            Choose API:
            <br />
          </label>
          <select id="api" value={selectedAPI} onChange={handleApiChange}>
            <title>Choose API</title>
            {/* if selectedAPI is openai, use chatgpt-4o-latest, otherwise use gpt-4o */}
            <option value="GPT4">gpt-4o</option>
            <option value="openai">chatgpt-4o-latest</option>
            {/*<option value="HuggingFace">HuggingFace</option>*/}
          </select>
          <p>(Time / Quality tradeoff - latest is best)</p>

          {/* Space for text */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 rounded px-4 py-2 font-bold text-white"
          >
            Create A Map
          </button>
          <button
            type="button"
            onClick={handleNewMapSubmit}
            className="bg-green-500 hover:bg-green-700 rounded px-4 py-2 font-bold text-white"
          >
            Add To Current Map
          </button>
          <button
            type="button"
            onClick={clearMap}
            className="bg-red-500 hover:bg-red-700 rounded px-4 py-2 font-bold text-white"
          >
            Clear Map
          </button>
          <div className="text-ellipsis text-xs text-nextlightblueish">
            HINT: YOU CAN CLICK NODES!
            <br />
            Updated 8.20.24
            <br />
            If another node is clicked, that request will be made in parallel
            and added to the map when complete.
          </div>
          {isLoading ? (
            <div>
              <h2 className="mt-4 overflow-auto text-lightblue">
                Loading your answer.... Copyable text will be here.
              </h2>
              <div
                className="loader relative mb-4 h-12 w-12 animate-spin-slow
           rounded-full border-8 border-t-8 border-b-blue bg-albanypurp ease-linear"
              ></div>
            </div>
          ) : (
            <pre className="mt-4 whitespace-pre-wrap text-white">
              <pre className="mt-4 whitespace-pre-wrap text-white">
                {lastResponse}
              </pre>
            </pre>
          )}
          {}
          <div className="text-white"></div>
        </div>
      </form>
    </div>
  );
};

OpenAIInput.propTypes = {
  onResponse: PropTypes.func.isRequired,
  nodeData: PropTypes.string,
  existingMarkdown: PropTypes.string.isRequired,
  onClear: PropTypes.func,
  onInputSubmit: PropTypes.func.isRequired // Add the prop type for onInputSubmit
};

export default OpenAIInput;
