/*  ========================================================================
    # Webpack Configuration - Production
    ========================================================================  */

/**
 * Additional configuration that is only used for production.
 *
 *
 * Table of Contents:
 *
 * Dependencies
 * SCSS
 * Config Production
 * Module Exports
 */

/*  Dependencies
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
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*  SCSS
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

/*  Config Production
    ========================================================================  */

const production = {
  mode: 'production',
  output: {
    publicPath: settings.urls.live + settings.urls.puplicPath
  },
  module: {
    rules: [SCSS()]
  },
  plugins: [
    // Environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Clean Webpack Plugin
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: settings.paths.dist.clean,
      verbose: true,
      dry: false
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
      path: path.resolve(__dirname, settings.paths.dist.base),
      filename: 'css/[name].min.css'
    }),

    // HTML Webpack Plugin - Index
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: '../index.html',
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

/*  Module Exports
    ========================================================================  */

module.exports = merge(common, production);
