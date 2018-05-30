const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
