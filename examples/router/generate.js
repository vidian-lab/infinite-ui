const files = require.context('../docs', false, /\.md$/)

export function getFileList () {
  const result = []
  const blackList = ['./Installation.md']
  files.keys().map(key => {
    if (blackList.includes(key)) return
    const name = key.replace(/\.\//g, '').replace(/.md/g, '')
    const element = {
      path: `/guide/${name}`,
      name: name,
      component: files(key).default,
      meta: {
        type: (name.indexOf('Chart') !== -1) ? 'chart' : 'component'
      }
    }
    
    result.push(element)
  })
  return result
};
