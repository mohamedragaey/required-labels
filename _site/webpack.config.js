const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const YarnAddWebpackPlugin = require('yarn-add-webpack-plugin')
const WebpackRTLPlugin = require('webpack-rtl-plugin')

// Create multiple instances
// const extractRtl = new ExtractTextPlugin({filename: 'css/app-rtl.css', disable: false, allChunks: true});
// const extractLtr = new ExtractTextPlugin({filename: 'css/app.css', disable: false, allChunks: true});

module.exports = {
  entry: ['./src/js/script.js', './src/scss/app.scss'],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 3000,
    hot: false
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({filename: 'css/app.css', disable: false, allChunks: true}),
    // extractRtl,
    // extractLtr,
    new WebpackRTLPlugin({
      filename: 'css/app-rtl.css',
      diffOnly: false,
      minify: true
    }),

    new UglifyJsPlugin({
      sourceMap: true
    }),
    // Copy Fonts and Images From src to dist
    new CopyWebpackPlugin([

      {from: 'src/fonts', to: './fonts'},
      {from: 'src/images', to: './images'},
      {from: 'node_modules/font-awesome/fonts', to: './fonts'}

    ], {
      // By default, we only copy modified files during
      // a watch or webpack-dev-server build. Setting this
      // to `true` copies all files.
      copyUnmodified: false
    }),
    // Install new npm packages when they used without being downloaded yet
    new YarnAddWebpackPlugin({
      // save dependencies as development or regular dependencies.
      dev: false,
      // Generate a lock file or don't. It's up to you!
      pure: false,
      // Install missing peerDependencies
      peerDependencies: true,
      // Reduce amount of console logging
      quiet: false
    })
  ],
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      // rule for js files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      // rule for css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'style-loader',
            'css-loader'
          ]
        })
      },

      // rule for Scss files
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader' // translates CSS into CommonJS
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },

      // rule for images
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },

      // rule for Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
