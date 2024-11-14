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

export default formatData;
