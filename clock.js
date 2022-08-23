class Clock {
  constructor() {
    this.currentTime = 0;
    this.intervalId = null;
  }

  start(printTimeCallback) {
    this.intervalId = setInterval(() => {
      this.currentTime++;
      if (printTimeCallback) {
        printTimeCallback(this.currentTime);
      }
    }, 1000);
  }

  getMinutes() {
    return Math.floor(this.currentTime / 60);
  }

  getSeconds() {
    return Math.floor(this.currentTime % 60);
  }

  computeTwoDigitNumber(value) {
    let toString = value.toString();
    let nums = toString.split("");
    return nums.length === 1 ? "0" + toString : toString;
  }

  stop() {
    clearInterval(this.intervalId);
  }

  split() {
    let minTimeStamp = this.getMinutes(this.currentTime);
    let secTimeStamp = this.getSeconds(this.currentTime);
    if (minTimeStamp === 0) {
      return `You survived 00:${this.computeTwoDigitNumber(
        this.currentTime
      )} seconds, Commander.`;
    } else {
      return `You survived ${this.computeTwoDigitNumber(
        minTimeStamp
      )}:${this.computeTwoDigitNumber(secTimeStamp)}minutes, Commander.`;
    }
  }
}
