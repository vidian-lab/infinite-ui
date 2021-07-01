module.exports = (function (settings) {
  settings.test_workers = false
  settings.selenium.server_path = require('selenium-server').path
  settings.selenium.cli_args = {
    'webdriver.chrome.driver': require('chromedriver').path,
    'webdriver.safari.driver': '/usr/bin/safaridriver',
    'webdriver.ie.driver': process.platform === 'win32' ? require('iedriver').path : ''
  }
  return settings
})(require('./nightwatch.json'))
