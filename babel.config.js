module.exports = {
  presets: [
    ['@vue/app',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          ie: '11',
          chrome: '80'
        }
      }]
  ],
  plugins: [
    'syntax-dynamic-import'
  ]
}
