/*  ========================================================================
    # Webpack - Settings
    ========================================================================  */

/**
 * Table of Contents:
 *
 * General
 * URLs
 * Paths
 * Entries
 * Copy
 * Development Server
 */

// DotEnv
require('dotenv').config();

module.exports = {
  // General
  // ===========================================================================

  name: 'projects.timschneider.xyz/countdown/',

  // URLs
  // ===========================================================================

  urls: {
    live: 'https://projects.timschneider.xyz/countdown/',
    puplicPath: 'dist/'
  },

  // Paths
  // ===========================================================================

  paths: {
    src: {
      base: './src/'
    },
    dist: {
      base: './dist/',
      clean: ['**/*']
    },
    templates: './src/templates/'
  },

  // Entries
  // ===========================================================================

  entries: {
    app: ['./src/js/main.js', './src/css/main.scss']
  },

  // Copy
  // ===========================================================================

  copy: [
    // Favicons
    {
      from: './src/images/favicons',
      to: './images/favicons'
    }
  ],

  // Development Server
  // ===========================================================================

  developmentServer: {
    public: () => {
      return process.env.DEVSERVER_PUBLIC || 'http://localhost:8080';
    },
    host: () => {
      return process.env.DEVSERVER_HOST || 'localhost';
    },
    port: () => {
      return process.env.DEVSERVER_PORT || 8080;
    },
    https: () => {
      return process.env.DEVSERVER_HTTPS || false;
    },
    poll: () => {
      return process.env.DEVSERVER_POLL || false;
    }
  }
};
