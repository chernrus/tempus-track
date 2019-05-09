var Time = (function () {

  function isTime(time) {
    const reg = /[0-9]{2}:[0-9]{2}/g;
    return reg.test(time);
  }

  function getTime(foramt) {
    var result = '',
      currentTime = new Date(),
      hours = currentTime.getHours(),
      minutes = currentTime.getMinutes(),
      seconds = currentTime.getSeconds(),
      tStrHM = `${(hours > 9 ? hours : `0${hours}`)}:${(minutes > 9 ? minutes : `0${minutes}`)}`;

      switch (foramt) {
        case 'hh:mm':
          result = tStrHM;
          break;
        case 'hh:mm:ss':
          result = `${tStrHM}:${(seconds > 9 ? seconds : `0${seconds}`)}`;
          break;
        default:
          result = tStrHM;
      }

    return result;
  }

  function parseTimeFormat(time, format) {
    if(isTime(time)) {
      var timeArr = time.split(':');

      return `${+timeArr[0]}h ${+timeArr[1]}m`;
    }

    return '0h 0m';
  }

  function timeToText(time, format) { //time in seconds
    let hours = 0,
      minutes = 0,
      seconds = 0,
      timeStr = '00:00';

    if(time < 60) {
      minutes = 0;
      seconds = time;
    }
    else if(time >= 60) {
      minutes = Math.floor(time/60);
      seconds = time - minutes*60;
    }

    if(minutes < 60) {
      hours = 0;
    }
    else if(minutes >= 60) {
      hours = Math.floor(minutes/60);
      minutes = minutes - hours*60;
    }

    // console.log(hours, minutes, seconds);

    switch (format) {
      case 'mm:ss':
        timeStr = `${(minutes > 9 ? minutes : `0${minutes}`)}:${(seconds > 9 ? seconds : `0${seconds}`)}`;
        break;
      case 'hh:mm':

        break;
      default:

    }

    return timeStr;
  }

  return {
    isTime,
    getTime,
    parseTimeFormat,
    timeToText
  }

}());

export default Time;
