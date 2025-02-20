module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['./src/**/**.ts'],
  coverageReporters: ['lcov', 'json-summary', 'clover', 'text', ['text', { file: 'coverage.txt', path: './' }]],
}
