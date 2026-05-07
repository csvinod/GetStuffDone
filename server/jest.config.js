module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  collectCoverageFrom: [
    'main/**/*.js',
    '!main/**/*.test.js',
    '!node_modules/**'
  ],
  verbose: true,
  testTimeout: 10000
};
