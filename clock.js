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

function printClock() {
  printMinutes();
  printSeconds();
}

function printMinutes() {
  minUni.innerHTML = clock.computeTwoDigitNumber(clock.getMinutes())[1];
  minDec.innerHTML = clock.computeTwoDigitNumber(clock.getMinutes())[0];
}

function printSeconds() {
  secUni.innerHTML = clock.computeTwoDigitNumber(clock.getSeconds())[1];
  secDec.innerHTML = clock.computeTwoDigitNumber(clock.getSeconds())[0];
}
