module.exports = {
  presets: [
    [ 
      '@vue/app', {
        useBuiltIns: 'entry'
        // corejs: 3
      }
      // {
      //   targets: {
      //     edge:"17",
      //     firefox:"60",
      //     chrome:"67",
      //     safari:"11.1",
      //     ie:"9"
      // },
      //   useBuiltIns: 'usage'
      // }
    ]
  ],
  plugins: [
    'syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-jsx',
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
