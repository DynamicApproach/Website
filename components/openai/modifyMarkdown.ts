import formatData from "components/openai/formatData";

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

export default modifyMarkdown;
