module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  // testRegex: '.*\\.spec\\.ts$',
  collectCoverage: true,
  coverageDirectory: './coverage',
  rootDir: '../../',
  moduleNameMapper: {
    '^@apps/(.*)$': '<rootDir>/apps/$1',
    '^@packages/(.*)$': '<rootDir>/packages/$1',
  }
}
