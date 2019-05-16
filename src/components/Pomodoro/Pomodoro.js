import React, { Component } from 'react';
import './Pomodoro.scss';
import { loader } from 'Utils/loader';
import Time from 'Utils/Time';
import Timer from 'Utils/Timer';
import ProgressBar from 'Components/ProgressBar';
import PomodoroControl from 'Components/PomodoroControl';
import PomodoroTask from 'Components/PomodoroTask';
import TimerConfiguration from 'Components/Settings/TimerConfiguration';
import { PomodoroController as pC } from './PomodoroController';

class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      timeText: '25:00',
      percentage: 0,
      focusLength: 25,
      shortBreak: 5,
      longBreak: 30,
      goal: 12,
      sessionsInRound: 4,
      currentType: 'focus',
      currentRound: 1,
      startTime: 10,
      remainTime: 10, //25 min in seconds,
      state: 'stopped',
      taskName: ''
    };
  }

  componentDidMount() {
    this.loadSettings();

  }

  saveCurrent = () => {

  }

  onTick = (remainTime) => {
    console.log(remainTime);
    this.setState({ remainTime });
    this.saveCurrent();
  }

  onStop = () => {
    console.log('stop');
    this.timer.time = this.state.shortBreak*60;
  }

  loadSettings = () => {
    loader.loadSettings('timerSettings')
      .then(
        res => {
          const { focusLength,
            shortBreak,
            longBreak,
            sessionsInRound,
            goal
          } = res;
          this.setState({ focusLength, shortBreak, longBreak, sessionsInRound, goal, remainTime: focusLength*60, startTime: focusLength*60  });
          const timer = new Timer({ time: this.state.remainTime, step: 1 });
          timer.onTick = this.onTick;
          timer.onEnd = this.onStop;
          this.timer = timer;
        },
        error => {console.log(error);}
      )
  }

  startTimer = () => {
    console.log('start');
    this.timer.start();
    this.setState({ state: 'started' });
  }

  pauseTimer = () => {
    console.log('pause');
    this.timer.pause();
    this.setState({ state: 'paused' });
  }

  skipRound = () => {
    console.log('skip');
  }

  getPercentage = (current, full) => {
    return (full - current) * 100 / full;
  }

  render() {

    const {
        remainTime,
        startTime
      } = this.state,
      timeText = Time.timeToText(remainTime, 'mm:ss'),
      percentage = this.getPercentage(remainTime, startTime);

    console.log(percentage);
    return (
      <div>
        <h2>Pomodoro (In developing)</h2>
        <ProgressBar
          strokeWidth="10"
          sqSize="200"
          percentage={ percentage }
          text={ timeText }/>
        <PomodoroControl
          onStart={this.startTimer}
          onPause={this.pauseTimer}
          onSkip={this.skipCycle}/>
        <PomodoroTask/>
        <TimerConfiguration/>
      </div>
    );
  }
}


export default Pomodoro;
