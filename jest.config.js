const path = require('path')
module.exports = {
  rootDir: path.join(__dirname, './'),
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  collectCoverage: true,
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // },
  coverageDirectory: path.join(__dirname, './tests/unit/coverage')
}
