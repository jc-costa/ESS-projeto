module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/spec/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  // coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules'],
  reporters: ['default'],
  globals: { 'ts-jest': { diagnostics: false } },
  transform: {},
};