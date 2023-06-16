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

export default getNodePath;
