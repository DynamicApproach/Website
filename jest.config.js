// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require("next/jest")()({
    moduleDirectories: ["<rootDir>", "node_modules"],
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest/jest.setup.js"]
  });