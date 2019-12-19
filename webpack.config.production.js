/*  ========================================================================
    # Webpack Configuration - Production
    ========================================================================  */

/**
 * Additional configuration that is only used for production.
 *
 * Table of Contents:
 * 1. Dependencies
 * 2. SCSS
 * 3. Config Production
 * 4. Module Exports
 */

/*  1. Dependencies
    ========================================================================  */

// Configs
// const pkg = require('./package.json');
const settings = require('./webpack.config.settings.js');
const common = require('./webpack.config.common.js');

// Modules
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Plugins
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*  2. SCSS
    ========================================================================  */

const SCSS = () => {
  return {
    test: /\.scss$/,
    include: path.resolve(__dirname, settings.paths.src.base),
    exclude: /node_modules/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 3,
          sourceMap: false
        }
      },
      {
        loader: 'clean-css-loader',
        options: {
          level: {
            2: {
              mergeMedia: false
            }
          }
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            /* eslint-disable */
            require('autoprefixer')({
              env: 'modern',
              cascade: false
            })
            /* eslint-enable */
          ]
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  };
};

/*  3. Config Production
    ========================================================================  */

const production = {
  mode: 'production',
  output: {
    publicPath: settings.urls.live
  },
  module: {
    rules: [SCSS()]
  },
  plugins: [
    // Specify Environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Terser Webpack Plugin
    new TerserWebpackPlugin({
      cache: true,
      parallel: true,
      extractComments: false,
      terserOptions: {
        keep_fnames: false,
        keep_classnames: true,
        mangle: true,
        ie8: false,
        safari10: false,
        output: {
          beautify: false,
          comments: false
        }
      }
    }),

    // Mini CSS Extract Plugin
    new MiniCssExtractPlugin({
      filename: `${settings.paths.dist.css}[name].min.css`
    })
  ]
};

/*  4. Module Exports
    ========================================================================  */

module.exports = merge(common, production);
