const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: true,
      children: true,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true
    },
    port: 3000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})
