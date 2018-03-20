// jest.config.js
module.exports = {
  verbose: true,
  notify: false,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  transform: {
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testRegex: "/tests/.*\\.(ts|tsx|js)$",
  setupFiles: ["<rootDir>/tests/test.config.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "tests/test.config",
    "tests/_helpers",
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/app.ts',
    'src/server.ts',
    'src/lib/db.ts',
    'src/lib/logger.ts',
    'src/config'
  ],
};
