/*  ========================================================================
    # Webpack Configuration - Common
    ========================================================================  */

/**
 * General used configuration.
 *
 *
 * Table of Contents:
 *
 * Dependencies
 * JavaScript
 * Images
 * Fonts
 * Config Common
 * Module Exports
 */

/*  Dependencies
    ========================================================================  */

// Configs
const pkg = require('./package.json');
const settings = require('./webpack.config.settings.js');

// Modules
const path = require('path');
const merge = require('webpack-merge');

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');

/*  JavaScript
    ========================================================================  */

const JavaScript = () => {
  return {
    test: /\.js$/,
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

/*  Images
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
          name: 'images/[name].[ext]'
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

/*  Fonts
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
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  };
};

/*  Config Common
    ========================================================================  */

const common = {
  name: pkg.name,
  entry: settings.entries,
  output: {
    path: path.resolve(__dirname, settings.paths.dist.base),
    filename: 'js/[name].min.js'
  },
  module: {
    rules: [JavaScript(), Images(), Fonts()]
  },
  plugins: [
    // Copy Webpack Plugin
    new CopyWebpackPlugin(settings.copy)
  ]
};

/*  Module Exports
    ========================================================================  */

module.exports = merge(common);
