const baseConfig = require('../../../jest.config.base.js')

module.exports = {
  ...baseConfig,
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
}
