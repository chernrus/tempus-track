import React, { Component } from 'react';
import './Pomodoro.scss';
import { loader } from 'Utils/loader';
import Time from 'Utils/Time';
import ProgressBar from '../ProgressBar';
import PomodoroControl from '../PomodoroControl';
import { PomodoroController as PmdrCtrl} from './PomodoroController';

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
      mode: 'focus',
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

          PmdrCtrl.setConfig({
            focusLength,
            shortBreak,
            longBreak,
            sessionsInRound,
            goal,
            onTick: this.onTick,
            onStop: this.onStop,
            onChange: this.onChange
          });

          this.setState({
            focusLength,
            shortBreak,
            longBreak,
            sessionsInRound,
            goal,
            remainTime: focusLength*60,
            startTime: focusLength*60
          });
        },
        error => {console.log(error);}
      )
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
    // this.timer.time = this.state.shortBreak*60;
  }

  onChange = ({ mode, round, remain }) => {
    let time = this.state.focusLength;
    switch (mode) {
      case 'focus':
        time = this.state.focusLength;
        break;
      case 'break':
        time = this.state.shortBreak;
        break;
      case 'longBreak':
        time = this.state.longBreak;
        break;
    }
    this.setState({
      mode,
      currentRound: round,
      remainTime: remain,
      startTime: time*60
    });
    console.log(this.state);
  }

  startTimer = () => {
    console.log('start');
    PmdrCtrl.start();
    this.setState({ state: 'started' });
  }

  pauseTimer = () => {
    console.log('pause');
    PmdrCtrl.pause();
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
        startTime,
        mode
      } = this.state,
      timeText = Time.timeToText(remainTime, 'mm:ss'),
      percentage = this.getPercentage(remainTime, startTime);

    return (
      <div>
        <ProgressBar
          strokeWidth="10"
          sqSize="200"
          percentage={ percentage }
          text={ timeText }
          mode={ mode }/>
        <PomodoroControl
          mode={ mode }
          onStart={this.startTimer}
          onPause={this.pauseTimer}
          onSkip={this.skipCycle}/>
      </div>
    );
  }
}


export default Pomodoro;

// <PomodoroTask/>
