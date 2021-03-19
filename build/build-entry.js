const fs = require('fs-extra')
const path = require('path')
const uppercamelize = require('uppercamelcase')

const Components = require('./get-components')()
const packageJson = require('../package.json')

const version = process.env.VERSION || packageJson.version
const tips = `/* eslint-disable */
// This file is auto gererated by build/build-entry.js`

function buildPackagesEntry () {
  const uninstallComponents = ['Message']
  const UI_FLAG_NAME = ''
  const importList = Components.map(
    name => `import ${UI_FLAG_NAME}${uppercamelize(name)} from './${name}'`
  )

  const exportList = Components.map(name => `${UI_FLAG_NAME}${uppercamelize(name)}`)

  const installList = exportList.filter(
    name => !~uninstallComponents.indexOf(`${UI_FLAG_NAME}${uppercamelize(name)}`)
  )

  const content = `${tips}
${importList.join('\n')}
const version = '${version}'
const components = [
  ${installList.join(',\n  ')}
]
const install = Vue => {
  components.forEach(Component => {
    if (Component.install && Component.name.toLocaleLowerCase().includes('infinite')) {
      Vue.use(Component)
    }else{
      Vue.prototype[\`\$\${Component.name}\`] = Component
    }
  })
};  
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  install,
  version,
  ${exportList.join(',\n  ')}
}
export default {
  install,
  version,
  ${exportList.join(',\n  ')}
}
  `
  fs.writeFileSync(path.join(__dirname, '../packages/index.js'), content)
}

buildPackagesEntry()
