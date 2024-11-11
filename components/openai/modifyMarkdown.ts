import formatData from "components/openai/formatData";

function modifyMarkdown(
  markdown: string,
  node: string,
  newData: string
): string {
  if (!markdown) {
    console.log("No existing markdown. Returning new data.");
    return newData;
  }

  // Clean up and format the new data
  newData = newData.replace(/^\s*# .*\n?/, "").replace(/-/g, "*");
  newData = formatData(newData); // Ensures consistent formatting

  const lines = markdown.split("\n");
  const nodeLineIndex = lines.findIndex((line) => line.trim() === node.trim());

  if (nodeLineIndex < 0) {
    console.warn(
      "Node not found in existing markdown. Returning existing markdown."
    );
    return markdown;
  }

  // Get the current line's indentation level
  const match = lines[nodeLineIndex].match(/^ */);
  const currentIndentation = match ? match[0].length : 0;
  const newIndentation = " ".repeat(currentIndentation + 2);

  // Prepare formatted new data
  const formattedNewData = newData
    .split("\n")
    .map((line) => (line.trim() ? newIndentation + line.trim() : line))
    .join("\n");

  // Insert the new data after existing children or as the first child
  let insertIndex = nodeLineIndex + 1;
  while (
    insertIndex < lines.length &&
    lines[insertIndex].startsWith(newIndentation)
  ) {
    insertIndex++;
  }

  // Insert the new data at the correct position
  lines.splice(insertIndex, 0, ...formattedNewData.split("\n"));

  return lines.join("\n");
}
function formatData(data: string): string {
  return data
    .split("\n")
    .map((line) => {
      const match = line.match(/^\**/);
      const numAsterisks = match ? match[0].length : 0;

      // Ensure the indentation level is not negative
      const indentationLevel = Math.max(0, numAsterisks - 1);
      const indentation = "  ".repeat(indentationLevel);

      return indentation + line.trim();
    })
    .join("\n");
}

export default modifyMarkdown;
