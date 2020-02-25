/*  ========================================================================
    # Webpack Configuration - Settings
    ========================================================================  */

/**
 * Settings for Webpack.
 *
 *
 * Table of Contents:
 *
 * General
 * URLs
 * Paths
 * Entries
 * Copy
 * Development Server
 */

module.exports = {
  /*  General
      ======================================================================  */

  name: 'projects.timschneider.xyz/countdown/',

  /*  URLs
      ======================================================================  */

  urls: {
    live: 'https://projects.timschneider.xyz/countdown/',
    puplicPath: 'dist/'
  },

  /*  Paths
      ======================================================================  */

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

  /*  Entries
      ======================================================================  */

  entries: {
    app: ['./src/assets/js/main.js', './src/assets/css/main.scss']
  },

  /*  Copy
      ======================================================================  */

  copy: [
    // Favicons
    {
      from: './src/assets/images/favicons',
      to: './images/favicons'
    }
  ],

  /*  Development Server
      ======================================================================  */

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
