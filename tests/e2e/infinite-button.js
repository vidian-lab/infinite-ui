module.exports = {
  'search button on infinite-button': function (browser) {
    browser
      .url('http://localhost:8081/#/guide/installation')
      .waitForElementVisible('xpath', '/html/body/div/section/div/div/section/aside/div/ul/li[2]/ul/li[1]/span', 1000)
      .click('xpath', '/html/body/div/section/div/div/section/aside/div/ul/li[2]/ul/li[1]/span')
      .click('body > div > section > div > div > section > aside > div > ul > li.el-submenu.is-active.is-opened > ul > li:nth-child(1)')
      .waitForElementVisible('xpath', '/html/body/div/section/div/div/section/main/section/p[1]', 3000, function () {
        browser.assert.containsText('body > div > section > div > div > section > main > section > p:nth-child(2)', '常用的操作按钮。')
      })
      .end()
  }
}
