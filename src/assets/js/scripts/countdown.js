/*  ========================================================================
    # Scripts - Countdown
    ========================================================================  */

const Countdown = {
  config: {
    date: new Date('Feb 28, 2020 00:00:00').getTime(),
    element: {
      container: document.getElementById('countdown'),
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    }
  },

  calcValues(distance) {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  },

  dispValues(days, hours, minutes, seconds) {
    this.config.element.days.innerHTML = days < 10 ? '0' + days : days;
    this.config.element.hours.innerHTML = hours < 10 ? '0' + hours : hours;
    this.config.element.minutes.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    this.config.element.seconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;
  },

  expired() {
    /* eslint-disable */
    console.log('The countdown has expired!');
    setInterval(() => {
      cornify_add();
    }, 3000);
    /* eslint-enable */
  },

  init() {
    const x = setInterval(() => {
      const distance = this.config.date - new Date().getTime();

      const values = this.calcValues(distance);
      this.dispValues(values.days, values.hours, values.minutes, values.seconds);

      if (distance < 0) {
        clearInterval(x);
        this.dispValues(0, 0, 0, 0);
        this.expired();
      }
    }, 1000);
  }
};

export default Countdown;
