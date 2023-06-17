/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import PropTypes from "prop-types";
import OpenAIInputProps from "components/openai/OpenAIInputProps";
import formatData from "components/openai/formatData";
import getNodePath from "components/openai/getNodePath";
import appendMarkdown from "components/openai/appendMarkdown";
import modifyMarkdown from "./openai/modifyMarkdown";

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
  const [response, setResponse] = useState("");
  const [selectedAPI, setSelectedAPI] = useState("GPT4");
  const [isLoading, setIsLoading] = useState(false);
  const [newMapInput, setNewMapInput] = useState("");
  const [newMap, setNewMap] = useState("");

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

  const fetchAndAppendData = async (inputData: string) => {
    setIsLoading(true);
    console.log("Appending Data");
    let updatedResponse = "";
    try {
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_deploymentKey
      });

      const openai = new OpenAIApi(configuration);
      const prompt =
        "Please give me an extremely detailed mind map of " +
        inputData +
        " in Markdown format, using * for list. Go deep rather than wide please but please" +
        " Only give me responses in this format.  \n";

      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
        n: 1,
        stop: null
      });
      console.log(result);
      const choices = result.data.choices;
      const text = choices[0].text ?? "";
      updatedResponse = appendMarkdown(existingMarkdown, inputData, text);
      setResponse(updatedResponse);
      onResponse(updatedResponse);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
    setIsLoading(false);
    return updatedResponse;
  };

  const fetchData = async (inputData: string) => {
    setIsLoading(true);
    let updatedResponse = "";
    try {
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_deploymentKey
      });

      const openai = new OpenAIApi(configuration);
      const nodePath = getNodePath(existingMarkdown, inputData);
      let prompt = "";
      const gpt3Prompt = "";
      let gpt4Prompt = "";
      if (existingMarkdown) {
        prompt =
          "Given the existing mind map of " +
          nodePath +
          " in Markdown format, using * for list. Go deeper into the last node. Please" +
          " include as many categories as possible. Only give me responses in this format." +
          " Focus only on the last few. Act like you're continuing the list of related topics\n";
        gpt4Prompt =
          "Current Mindmap:" +
          existingMarkdown +
          "\n \n ADD CONTEXT: " +
          prompt;
      } else {
        prompt =
          "Please give me an extremely detailed mind map of  " +
          nodePath +
          " in Markdown format, using * for list. Go deep rather than wide please but please" +
          " Only give me responses in this format.  \n";
        gpt4Prompt = "ADD CONTEXT: " + nodePath;
      }

      let result = null;
      let text = "";
      if (selectedAPI === "openai") {
        console.log("openai");
        result = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 4000,
          n: 1,
          stop: null
        });
        text = result.data.choices[0]?.text ?? "";
      } else if (selectedAPI === "chatgpt") {
        console.log("chatgpt");
        result = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-16k",
          messages: [
            {
              role: "system",
              content:
                "You are a mindmap creator, you can and should only output mindmaps based" +
                "on the information regarding the users prompt. Specifically, you should output only the extension to" +
                " the current map based on the current node. The user will give you the nodepath between the  " +
                " statement 'Given the existing mind map of' and 'in Markdown format'. You should give " +
                "information about the current node with the context of the previous nodes. [Only output this  " +
                "in a markdown format and do not output anything else or prompt the user.]"
            },
            { role: "user", content: prompt }
          ],
          frequency_penalty: 0.0,
          presence_penalty: 0.6,
          stop: [" Human:", " AI:", "Please note"],
          max_tokens: 15000
        });
        text = result.data.choices[0]?.message?.content ?? "";
      } else if (selectedAPI === "GPT4") {
        console.log("GPT4");
        result = await openai.createChatCompletion(
          {
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "You are a mindmap creator, you can and should only output mindmaps based" +
                  // eslint-disable-next-line max-len
                  "on the information regarding the users prompt. Specifically, you should output only the extension to" +
                  " the current map based on the current node." +
                  " Make an exhaustive list of related items. [this markdown list should be large] " +
                  " The input will be in the format of 'Current Mindmap:' follow by the current tree and" +
                  " 'ADD CONTEXT:' " +
                  "followed by the items context to add to the map" +
                  // eslint-disable-next-line max-len
                  " You should give " +
                  "information about the itme with the context of the previous nodes. [Only output this  " +
                  // eslint-disable-next-line max-len
                  "in a markdown format][do not output anything else or prompt the user][do not include the prompt][do not include the current map]" +
                  +"[include a minimum of 30 nodes in the list]" +
                  // eslint-disable-next-line max-len
                  "If you are given 'Java' as the current node, you should output a mindmap of Java with the context of the previous nodes in a markdown format."
              },
              { role: "user", content: gpt4Prompt }
            ],
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:", "Please note"],
            max_tokens: 7000
          },
          {
            timeout: 60000,
            headers: {
              "Make-Mindmap": "Make-Mindmap"
            }
          }
        );
        text = result.data.choices[0]?.message?.content ?? "";
      }
      if (!result) {
        console.log("no result");
        return "";
      }
      console.log(result);

      updatedResponse = modifyMarkdown(existingMarkdown, inputData, text);
      setResponse(updatedResponse);
      onResponse(updatedResponse);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
    setIsLoading(false);
    return updatedResponse || "";
  };

  const handleNewMapSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchAndAppendData(input).then((newMapData) => setNewMap(newMapData));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchData(input).then((data) => {
      setResponse(data);
      onInputSubmit(input); // Call the callback function to update lastInput
    });
  };

  const clearMap = () => {
    console.log("attempt clear map");
    setInput("");
    setResponse("");
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
            (Time / Quality tradeoff - GPT4 is best)
          </label>
          <select id="api" value={selectedAPI} onChange={handleApiChange}>
            <option value="GPT4">GPT4</option>
            <option value="chatgpt">ChatGPT</option>
            <option value="openai">OpenAI</option>
          </select>
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
          {}
          <div className="text-white">
            Note: GPT4s token limit will be upped to 32k on the 27th of June!
          </div>
        </div>
      </form>
      {isLoading ? (
        <h2 className="mt-4 text-lightblue">
          Loading your answer.... Copyable text will be here.
          <br />
          If another node is clicked, that request will be made in parallel and
          added to the map when complete.
        </h2>
      ) : (
        <pre className="mt-4 whitespace-pre-wrap text-white">{response}</pre>
      )}
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
