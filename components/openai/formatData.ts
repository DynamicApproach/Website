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

export default formatData;
