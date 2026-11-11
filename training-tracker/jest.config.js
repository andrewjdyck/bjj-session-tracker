const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // Firestore rules tests need the emulator; they run via `npm run test:rules`.
  testPathIgnorePatterns: process.env.RULES_TESTS
    ? ['/node_modules/', '/.next/']
    : ['/node_modules/', '/.next/', '<rootDir>/tests/rules/'],
}

module.exports = createJestConfig(customJestConfig)
