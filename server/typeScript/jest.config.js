export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/**/spec/**/*.spec.ts'],
    testPathIgnorePatterns: ['/node_modules/'],
    // coverageDirectory: './coverage',
    coveragePathIgnorePatterns: ['node_modules'],
    reporters: ['default', 'jest-junit'],
    globals: { 'ts-jest': { diagnostics: false } },
    transform: {},
};
//# sourceMappingURL=jest.config.js.map