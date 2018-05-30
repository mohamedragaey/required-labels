const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['./src/js/app.js', './src/scss/app.scss'],

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({filename: 'css/app.css', disable: false, allChunks: true})
  ],

  output: {
    filename: 'js/required-label.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  module: {
    rules: [
      // set up standard-loader as a preloader for JS Standard
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          // Emit errors instead of warnings (default = false)
          error: false,
          // enable snazzy output (default = true)
          snazzy: true,
          // other config options to be passed through to standard e.g.
          parser: 'babel-eslint'
        }
      },

      // Rule for js files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      // Rule for css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'style-loader',
            'css-loader'
          ]
        })
      },

      // Rule for Scss files
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              }
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js'
                }
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  }
}
