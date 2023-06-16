function appendMarkdown(
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
  console.log("New data:", newData);

  // Add the new node to the end of the existing markdown
  return markdown + "\n\n" + newData;
}

export default appendMarkdown;
