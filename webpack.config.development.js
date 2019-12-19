/*  ========================================================================
    # Webpack Configuration - Development
    ========================================================================  */

/**
 * Additional configuration that is only used for development.
 *
 * Table of Contents:
 * 1. Dependencies
 * 2. Development Server
 * 3. JavaScript Linter
 * 4. SCSS
 * 5. Config Development
 * 6. Module Exports
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
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const StylelintBareWebpackPlugin = require('stylelint-bare-webpack-plugin');

/*  2. Development Server
    ========================================================================  */

const devServer = () => {
  return {
    public: settings.developmentServer.public(),
    host: settings.developmentServer.host(),
    port: settings.developmentServer.port(),
    https: !!parseInt(settings.developmentServer.https(), 10),
    contentBase: path.resolve(__dirname, `${settings.paths.src.base}templates`),
    watchContentBase: true,
    watchOptions: {
      poll: settings.developmentServer.poll(),
      ignored: /node_modules/
    },
    open: true,
    hot: true,
    hotOnly: true,
    quiet: true,
    disableHostCheck: true
  };
};

/*  3. JavaScript Linter
    ========================================================================  */

const JavaScriptLinter = () => {
  return {
    test: /\.(js|vue)$/,
    include: path.resolve(__dirname, settings.paths.src.base),
    exclude: /node_modules/,
    enforce: 'pre',
    use: ['eslint-loader']
  };
};

/*  4. SCSS
    ========================================================================  */

const SCSS = () => {
  return {
    test: /\.scss$/,
    include: path.resolve(__dirname, settings.paths.src.base),
    exclude: /node_modules/,
    use: [
      {
        loader: 'style-loader'
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

/*  5. Config Development
    ========================================================================  */

const development = {
  mode: 'development',
  devServer: devServer(),
  output: {
    publicPath: settings.developmentServer.public() + '/'
  },
  module: {
    rules: [JavaScriptLinter(), SCSS()]
  },
  plugins: [
    // Specify Environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    // Hot Module Replacement Plugin
    new webpack.HotModuleReplacementPlugin(),

    // Friendly Errors Webpack Plugin
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running at: localhost:8080'],
        notes: ['Hot reloading is enabled.']
      },
      clearConsole: true
    }),

    // Stylelint Bare Webpack Plugin
    new StylelintBareWebpackPlugin({
      files: '**/*.s?(a|c)ss'
    })
  ]
};

/*  6. Module Exports
    ========================================================================  */

module.exports = merge(common, development);
