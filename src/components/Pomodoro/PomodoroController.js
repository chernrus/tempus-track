import loader from 'Utils/loader';

export const PomodoroController = (function () {
  let timer = null,
    _onTick = null,
    _onStop = null,
    _onChange = null,
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
    if(timer) clearInterval(timer);
    timer = null;
    _state = 'stopped';
  }

  function _tick() {
    if(_remain > 0 && _state === 'started') {
      _remain--;
      _onTick(_remain);
    }
    else if(_remain <= 0){
      _onTick(_remain);
      //_stop();
      _changeMode();
    }
  }

  function _changeMode() {
    if(_mode === 'break' || _mode === 'longBreak') {
      _mode = 'focus';
      _remain = _focusTime;
      _round++;
      _stop();
    }
    else if(_round % _session === 0 && _mode === 'focus') {
      _mode = 'longBreak';
      _remain = _longBreakTime;
    }
    else {
      _mode = 'break';
      _remain = _breakTime;
    }

    _onChange({ mode: _mode, round: _round, remain: _remain });
    console.log(_remain, _mode, _round);
  }

  function start() {
    if(!timer) {
      _state = 'started';
      timer = setInterval(_tick, _step);
    }
  }

  function pause() {
    _state = _state === 'started' ? 'paused' : 'started';
  }

  function stop() {
    _stop();
  }

  function setConfig({ focusLength, shortBreak, longBreak, step, onTick, onStop, onChange, goal, sessionsInRound }) {
    _focusTime = focusLength*60 || 1500;
    _breakTime = shortBreak*60 || 300;
    _longBreakTime = longBreak*60 || 1800;
    _roundsAmount = goal || 12;
    _remain = _focusTime;
    _session = sessionsInRound || 4;
    _step = step || 1000;
    _onTick = onTick;
    _onStop = onStop;
    _onChange = onChange;
  }


  return {
    start,
    pause,
    stop,
    setConfig
  }
}());
