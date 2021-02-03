const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const portfinder = require('portfinder')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const { getExternalsEl } = require('./get-externals-elements')
const propElExternals = getExternalsEl()
module.exports = {
  mode: 'production',
  entry: {
    app: ['./packages/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: 'infinite-ui.common.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('examples'),
      'infinite-ui': resolve('./')
    },
    modules: ['node_modules']
  },
  externals: propElExternals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules|utils\/popper\.js|utils\/date\.js/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
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
