import loader from 'Utils/loader';

const PomodoroController = (function () {
  let timer = null,
    _onTick = null,
    _onStop = null,
    _step = 1000,
    _remain = 0,
    _paused = false,
    _round = 1,
    _state = 'stopped',
    _mode = 'focus',
    _focusTime = 0,
    _breakTime = 0,
    _longBreakTime = 0,
    _roundsAmount = 12,
    _session = 4;


  function _stop() {
    clearInterval(timer);
    timer = null;
    _state = 'stopped';
  }

  function _tick() {
    if(_remain > 0 && _state === 'started') {
      _remain--;
      _onTick(_remain);
    }
    else if(_remain === 0){
      _onTick(_remain);
      _stop();
    }
  }

  function _changeMode(mode) {
    _stop();
    if(_round % _session === 0 && _mode === 'focus') {
      _mode = 'longBreak';
      _remain = _longBreakTime;
    }
    else {
      _mode = 'break';
      _remain = _breakTime;
    }
    if(_mode === 'break' || _mode === 'longBreak') {
      _mode = 'focus';
      _remain = _focusTime;
    }

    _round++;

    start();
  }

  function start() {
    if(!timer) {
      _state = 'started';
      timer = setInterval(_tick, step);
    }
  }

  function pause() {
    _state = 'paused';
  }

  function stop() {
    _stop();
  }



  return {
    start,
    pause,
    stop,
    set config({ focusTime, breakTime, longBreakTime, step, onTick, onStop, roundsAmount }) {
      _focusTime = focusTime*60 || 1500;
      _breakTime = breakTime*60 || 300;
      _longBreakTime = longBreakTime*60 || 1800;
      _roundsAmount = roundsAmount || 12;
      _remain = focusTime;
      _step = step || 1000;
      _onTick = onTick;
      _onStop = onStop;
    }
  }
});

export default PomodoroController;
