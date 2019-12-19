/*  ========================================================================
    # Main JavaScript File
    ========================================================================  */

/**
 * Import all scripts and initialise them.
 */

import Greetings from './scripts/greetings';
import Countdown from './scripts/countdown';

const ArrayScripts = [Greetings, Countdown];

/*  Initialise
    ========================================================================  */

const Scripts = {
  init() {
    if (ArrayScripts.length > 0 && ArrayScripts !== undefined) {
      ArrayScripts.forEach(script => {
        script.init();
      });
    }
  }
};

Scripts.init();
