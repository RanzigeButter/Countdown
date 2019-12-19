/*  ========================================================================
    # Webpack Configuration - Common
    ========================================================================  */

/**
 * General used configuration.
 *
 * Table of Contents:
 * 1. Dependencies
 * 2. JavaScript
 * 3. Images
 * 4. Fonts
 * 5. Config Common
 * 6. Module Exports
 */

/*  1. Dependencies
    ========================================================================  */

// Configs
const pkg = require('./package.json');
const settings = require('./webpack.config.settings.js');

// Modules
const path = require('path');
const merge = require('webpack-merge');

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*  2. JavaScript
    ========================================================================  */

const JavaScript = () => {
  return {
    test: /\.(js|ts)x?$/,
    include: path.resolve(__dirname, settings.paths.src.base),
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          [
            '@babel/preset-env',
            {
              corejs: {
                version: 3,
                proposals: true
              },
              useBuiltIns: 'usage',
              targets: {
                browsers: pkg.browserslist.modern
              }
            }
          ]
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-runtime'
        ]
      }
    }
  };
};

/*  3. Images
    ========================================================================  */

const Images = () => {
  return {
    test: /\.(jpg|png|gif|svg)$/,
    include: path.resolve(__dirname, settings.paths.src.base),
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: `${settings.paths.dist.images}[name].[ext]`
        }
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            quality: 80
          },
          gifsicle: {
            optimizationLevel: 1,
            colors: 256
          },
          pngquant: {
            quality: 80,
            speed: 3
          },
          optipng: {
            enabled: false
          },
          svgo: {
            enabled: false
          }
        }
      }
    ]
  };
};

/*  4. Fonts
    ========================================================================  */

const Fonts = () => {
  return {
    test: /\.(woff2|woff|eot|otf|ttf)$/,
    include: path.resolve(__dirname, settings.paths.src.base),
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: `${settings.paths.dist.fonts}[name].[ext]`
        }
      }
    ]
  };
};

/*  5. Config Common
    ========================================================================  */

const common = {
  entry: settings.entries,
  output: {
    path: path.resolve(__dirname, settings.paths.dist.base),
    filename: `${settings.paths.dist.js}[name].min.js`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [JavaScript(), Images(), Fonts()]
  },
  plugins: [
    // Clean Webpack Plugin
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),

    // Copy Webpack Plugin
    new CopyWebpackPlugin(settings.copy),

    // HTML Webpack Plugin - Index
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: 'true',
        collapseWhitespace: 'true',
        preserveLineBreaks: 'true',
        minifyCSS: 'false',
        minifyJS: 'false'
      }
    })
  ]
};

/*  6. Module Exports
    ========================================================================  */

module.exports = merge(common);
