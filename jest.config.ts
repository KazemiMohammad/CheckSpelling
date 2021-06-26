module.exports = {
  verbose: false,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  reporters: [["jest-reporter", {}]],
  globals: {
    "ts-jest": {
      packageJson: "<rootDir>/package.json",
    },
  },
  setupFilesAfterEnv: ["<rootDir>/set-up-enzyme.ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.ts"
  }
};