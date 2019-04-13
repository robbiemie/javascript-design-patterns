const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    host: 'localhost',
    // useLocalIp: true,
    disableHostCheck: true,
    port: 4000,
    open: true,
    quiet: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../src/html/index.html')
    })
    // new CleanWebpackPlugin(['dist'], {
    //   root: resolve(__dirname, '../')
    // })
  ]
}
