const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const WebpackRTLPlugin = require('webpack-rtl-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true
    }),
    new WebpackRTLPlugin({
      filename: 'css/app-rtl.css',
      diffOnly: false,
      minify: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
