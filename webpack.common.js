const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const YarnAddWebpackPlugin = require('yarn-add-webpack-plugin')

module.exports = {
  entry: ['./src/js/script.js', './src/scss/app.scss'],

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({filename: 'css/app.css', disable: false, allChunks: true}),

    // Copy Fonts and Images From src to dist
    new CopyWebpackPlugin([
      {from: 'src/fonts', to: './fonts'},
      {from: 'src/images', to: './images'},
      {from: 'src/favicon', to: './favicon'}
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
      },

      // Rule for images
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },

      // Rule for Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  }
}
