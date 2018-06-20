const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
let rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  },
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
module.exports = [
  {
    name: 'dist',
    mode: 'development',
    entry: ['./src/js/require-label.js', './src/scss/app.scss'],
    output: {
      library: 'UserList',
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },
    module: {
      rules: rules
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new uglifyJsPlugin(),
      new ExtractTextPlugin({filename: 'app.css'}),
      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'demo.html')
      })
    ]
  }
]
