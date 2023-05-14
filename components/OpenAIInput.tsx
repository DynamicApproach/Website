import { SetStateAction, useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import PropTypes from "prop-types";

interface OpenAIInputProps {
  onResponse: (response: string) => void;
  nodeData: string | null;
  existingMarkdown: string; // Add this prop
}

const NEXT_PUBLIC_deploymentKey = process.env.DEPLOYMENT_KEY;
console.log(NEXT_PUBLIC_deploymentKey);

const OpenAIInput: React.FC<OpenAIInputProps> = ({
  onResponse,
  nodeData,
  existingMarkdown
}) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const fetchData = async (inputData: string) => {
    setIsLoading(true); // set loading state
    try {
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_deploymentKey
      });

      const openai = new OpenAIApi(configuration);
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:
          "An extremely detailed mind map of a " +
          inputData +
          " in Markdown format. Go deep not wide please.",
        temperature: 0.5,
        max_tokens: 4000,
        n: 1,
        stop: null
      });
      const choices = result.data.choices;
      const text = choices[0].text ?? "";
      const updatedResponse = modifyMarkdown(existingMarkdown, inputData, text);
      setResponse(updatedResponse);
      onResponse(updatedResponse);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
    setIsLoading(false); // unset loading state
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchData(input);
  };

  useEffect(() => {
    console.log(nodeData);
    if (nodeData) {
      const nodeDataObj =
        typeof nodeData === "string" ? JSON.parse(nodeData) : nodeData;
      // parse the JSON string to an object if nodeData is a string
      fetchData(nodeDataObj.content);
    }
  }, [nodeData]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="input" className="block text-white">
          I would like a mindmap of a(n):
        </label>
        <input
          type="text"
          id="input"
          name="input"
          value={input}
          onChange={handleChange}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 rounded px-4 py-2 font-bold text-white"
        >
          Submit
        </button>
      </form>
      {isLoading ? (
        <h2 className="mt-4 text-white">
          Loading your answer.... Copyable text will be here.
        </h2>
      ) : (
        <pre className="mt-4 whitespace-pre-wrap">{response}</pre>
      )}
    </div>
  );
};

OpenAIInput.propTypes = {
  onResponse: PropTypes.func.isRequired,
  nodeData: PropTypes.string,
  existingMarkdown: PropTypes.string.isRequired // Add this prop type
};
function modifyMarkdown(
  markdown: string,
  node: string,
  newData: string
): string {
  // if no exsiting markdown, return the new data
  if (!markdown) {
    return newData;
  }
  const lines = markdown.split("\n");
  const nodeLineIndex = lines.findIndex((line) => line.includes(node));

  // If the node was found
  if (nodeLineIndex >= 0) {
    const newNodeData = newData
      .split("\n")
      .map((line) => "  " + line)
      .join("\n");
    lines.splice(nodeLineIndex + 1, 0, newNodeData);
  }

  return lines.join("\n");
}

export default OpenAIInput;
