module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1"
  },
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./__test__/setup.ts'],
  testEnvironmentVariables: {
    NODE_ENV: 'test'
  }
};