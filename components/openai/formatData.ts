function formatData(data: string): string {
  return data
    .split("\n")
    .map((line, index, lines) => {
      const match = line.match(/^\**/);
      const numAsterisks = match ? match[0].length : 0;
      const indentation = "  ".repeat(numAsterisks - 1); // -1 because root node has 0 extra indentation
      return indentation + line.trim();
    })
    .join("\n");
}

export default formatData;
