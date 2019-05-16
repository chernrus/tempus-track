class Timer {
  constructor(params) {
    this.timer = null;
    this.currentTime = params.time || 0; // all time in seconds
    this.startTime = params.time || 0;
    this.step = params.step || 1;
    this.isPaused = false;
  }

  start = () => {
    console.log('start timer');
    console.log(this.timer);
    console.log(this.currentTime);
    if(!this.timer) {
      this.tick(this.currentTime);
      this.timer = setInterval(this.doTick, 1000 * this.step)
    }
  }

  doTick = () => {
    console.log('tick');

    if(this.currentTime > 0 && !this.isPaused) {
      this.currentTime--;
      this.tick(this.currentTime);
    }
    else if(this.currentTime === 0){
      this.tick(this.currentTime);
      this.stop();
    }

  }

  pause = () => {
    console.log('pause timer');
    this.isPaused = !this.isPaused;
  }

  stop = () => {
    console.log('stop timer');
    clearInterval(this.timer);
    this.timer = null;
    this.doEnd();
  }

  set time(_time) {
    this.startTime = _time;
    this.currentTime = _time;
  }

  set onTick(tickCalback) {
    this.tick = tickCalback;
  }

  set onEnd(endCalback) {
    this.doEnd = endCalback;
  }
}

export default Timer;
