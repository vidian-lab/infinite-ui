const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, '../', dir)
}
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Components = require('./get-components')()
// const portfinder = require('portfinder')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { getExternalsEl } = require('./get-externals-elements')
const entry = {}
Components.forEach(c => {
  entry[c] = `./packages/${c}/index.js`
})
const webpackConfig = {
  mode: 'production',
  entry: entry,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd'
  },
  optimization: {
    // splitChunks: {
    //   name: true,
    //   // chunks: 'all', // 指定打包同步加载还是异步加载
    //   // minSize: 100000, // 构建出来的chunk大于30000才会被分割 
    //   // maxSize: 0, // 会尝试根据这个大小进行代码分割
    //   // minChunks: 2, // 制定用了几次才进行代码分割
    //   // maxAsyncRequests: 6,
    //   // maxInitialRequests: 4,
    //   cacheGroups: {
    //     g2: {
    //       test: /[\\/]node_modules[\\/]((@antv).*)[\\/]/, // 检测引入的库是否在node_modlues目录下的
    //       filename: 'infinite-g2.js',
    //       chunks: 'all'
    //       // priority: -5
    //     }
    //   }
    // }
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    ...getExternalsEl()
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'infinite-ui': resolve('./')
    }
  },
  performance: {
    hints: false
  },
  stats: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|utils\/popper\.js|utils\/date\.js/
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
    // new BundleAnalyzerPlugin({
    //   analyzerPort: async () => {
    //     await portfinder.getPortPromise()
    //   }
    // })

  ]
}

module.exports = webpackConfig
