const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const portfinder = require('portfinder')
const html = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const vendorPackage = isProduction ? {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  'highlight.js': 'hljs',
  '@antv/g2': 'G2'
} : {}
module.exports = {
  publicPath: './',
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: 'docs',
  pages: {
    index: {
      entry: 'examples/main.js'
    }
  },
  configureWebpack: config => {
    config.performance = {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
    config.resolve.alias['@'] = resolve('examples')
    config.resolve.alias['infinite-ui'] = resolve('./')

    config.externals = {
      ...vendorPackage
    }

    if (process.env.NODE_ENV === 'lib') {
      config.plugins.forEach((plugin, index) => {
        if (plugin instanceof html) {
          config.plugins.splice(index, 1)
        }
      })
    }
  },
  filenameHashing: false,
  chainWebpack: config => {
    if (isProduction) {
      config.plugin('html-index').tap(options => {
        // 添加分割后需要载入的分包
        options[0].chunks.push(...['chunk-elementui', 'chunk-antv'])
        return options
      })
    }
    // config.plugins.delete('preload-index')
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })

    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('./build/md-loader/index.js')
      .loader('./build/md-loader/index.js')

    config.when(isProduction, config => {
      config.optimization.splitChunks({
        cacheGroups: {
          antv: {
            name: 'chunk-antv',
            priority: 10,
            test: /[\\/]node_modules[\\/]_?@antv(.*)/
          },
          elementui: {
            name: 'chunk-elementui',
            priority: 10,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
            chunks: 'initial'
          },
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -5,
            chunks: 'all'
          }
        }
      })
    })

    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //   .tap(options => {
    //     options.push({
    //       analyzerPort: async () => {
    //         await portfinder.getPortPromise()
    //       }
    //     })
    //     return options
    //   })
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  }
}
