/*  ========================================================================
    # Scripts - Greetings
    ========================================================================  */

/**
 * Script for writing some stuff to the console.
 */

const Greetings = {
  consoleLog(message) {
    /* eslint-disable */
    console.log(message);
    /* eslint-enable */
  },

  init() {
    this.consoleLog(`
================================================================================
AUTHOR: Tim Schneider
TWITTER: @RanzigeButter
WEBSITE: timschneider.xyz
================================================================================
    `);
  }
};

export default Greetings;
