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
      const nodePath = getNodePath(existingMarkdown, inputData); // Get the complete path to the node
      let prompt = "";
      if (existingMarkdown) {
        // If existing markdown has data, we focus on the final part.
        prompt =
          "Given the existing mind map of " +
          nodePath + // Use the complete path to the node
          " in Markdown format, using * for list. Go deeper into the last node. Please" +
          " include as many categories as possible. Only give me responses in this format.+";
        (" Act like you're continuing the list.   \n");
      } else {
        // If no existing markdown, generate the whole mind map
        prompt =
          "An extremely detailed mind map of a " +
          nodePath + // Use the complete path to the node
          " in Markdown format, using * for list. Go deep rather than wide please but please" +
          " Only give me responses in this format.  \n";
      }
      console.log("Prompt:", prompt);

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
  existingMarkdown: PropTypes.string.isRequired
};

function modifyMarkdown(
  markdown: string,
  node: string,
  newData: string
): string {
  // If no existing markdown, return the new data
  if (!markdown) {
    console.log("No existing markdown. Returning new data.");
    return newData;
  }

  // Remove the first line starting with "# " (the title)
  newData = newData.replace(/^\s*# .*\n?/, "");
  // Convert all - to * (for markdown lists)
  newData = newData.replace(/-/g, "*");

  // Format new data
  newData = formatData(newData);
  console.log("New data:", newData);
  const lines = markdown.split("\n");
  const nodeLineIndex = lines.findIndex((line) => line.includes(node));

  // If the node was not found, return existing markdown
  if (nodeLineIndex < 0) {
    console.warn(
      "Node not found in existing markdown. Returning existing markdown."
    );
    return markdown;
  }

  // Get the indentation of the current line (number of leading spaces)
  const match = lines[nodeLineIndex].match(/^ */);
  const currentIndentation = match ? match[0].length : 0;
  // Define the indentation for the new lines (current indentation + 2 spaces)
  const newIndentation = " ".repeat(currentIndentation + 2);

  // Check if node has existing children
  let hasChildren = false;
  let insertIndex = nodeLineIndex + 1; // default insert index if no children
  while (
    insertIndex < lines.length &&
    lines[insertIndex].startsWith(newIndentation)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasChildren = true; // node has at least one child
    insertIndex++;
  }

  // Prepare new data for insertion
  const newNodeData = newData
    .split("\n")
    .map((line) =>
      line.trim() ? newIndentation + line.trim().replace(/\s+/g, " ") : line
    )
    .join("\n")
    .split("\n"); // split the new data into separate lines for checking duplication

  // Check if a child with the same name already exists and remove duplicates
  for (let i = 0; i < newNodeData.length; i++) {
    const child = newNodeData[i].trim();
    if (lines.some((line) => line.trim() === child)) {
      newNodeData.splice(i, 1);
      i--; // adjust index due to removal
    }
  }

  // Insert the new data at the correct position
  lines.splice(insertIndex, 0, ...newNodeData);

  return lines.join("\n");
}

function formatData(data: string): string {
  let currentIndentationLevel = 0;

  return data
    .split("\n")
    .map((line) => {
      // Count the number of asterisks at the beginning of the line
      const match = line.match(/^\**/);
      const numAsterisks = match ? match[0].length : 0;

      if (numAsterisks > currentIndentationLevel) {
        // If this line is more indented than the previous line, increase the indentation level
        currentIndentationLevel++;
      } else if (numAsterisks < currentIndentationLevel) {
        // If this line is less indented than the previous line, decrease the indentation level
        currentIndentationLevel--;
      }

      // Add two spaces of indentation for each indentation level
      return "  ".repeat(currentIndentationLevel) + line.trim();
    })
    .join("\n");
}

function getNodePath(markdown: string, node: string): string {
  console.log("Getting node path for", node);
  console.log("Markdown:", markdown);
  const lines = markdown.split("\n");
  const nodeLineIndex = lines.findIndex((line) => line.includes(node));

  let path = node; // start with the current node
  if (nodeLineIndex >= 0) {
    const match = lines[nodeLineIndex].match(/^ */);
    let currentIndentation = match ? match[0].length : 0;

    // traverse up the lines
    for (let i = nodeLineIndex - 1; i >= 0; i--) {
      const line = lines[i];
      const match = line.match(/^ */);
      const indentation = match ? match[0].length : 0;

      // if the indentation of the line is less than the current node,
      // it means this line is a parent node
      if (indentation < currentIndentation) {
        // add the parent node to the path
        path = line.trim() + " > " + path;
        currentIndentation = indentation; // update the current indentation
      }
    }
  }

  // if the path does not include the root, add it
  const root = lines[0].trim().replace(/\*/g, "");
  if (!path.startsWith(root)) {
    path = root + " > " + path;
  }

  // remove * from path string
  path = path.replace(/\*/g, "");
  console.log("Node path:", path);
  return path;
}

export default OpenAIInput;
