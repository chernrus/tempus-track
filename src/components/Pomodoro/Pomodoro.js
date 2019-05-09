import React, { Component } from 'react';
import './Pomodoro.scss';
import { loader } from 'Utils/loader';
import Time from 'Utils/Time';
import Timer from 'Utils/Timer';
import ProgressBar from 'Components/ProgressBar';
import PomodoroControl from 'Components/PomodoroControl';
import TimerConfiguration from 'Components/Settings/TimerConfiguration';

class Pomodoro extends Component {
  constructor(props) {
    super(props);

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
      currentTime: 10, //25 min in seconds,
      timer: null
    };
  }

  componentDidMount() {
    this.loadSettings();
    const timer = new Timer({ time: this.state.currentTime, step: 1 });
    timer.onTick = this.onTick;

    this.setState({ timer });
  }

  onTick = (currentTime) => {
    console.log(currentTime);
    this.setState({ currentTime })
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
          this.setState({ focusLength, shortBreak, longBreak, sessionsInRound, goal });
        },
        error => {console.log(error);}
      )
  }

  startTimer = () => {
    console.log('start');
    this.state.timer.start();
  }

  pauseTimer = () => {
    console.log('pause');
    this.state.timer.pause();
  }

  skipRound = () => {
    console.log('skip');
  }

  getPercentage = (current, full) => {
    return (full - current) * 100 / full;
  }

  render() {

    const {
        currentTime,
        startTime
      } = this.state,
      timeText = Time.timeToText(currentTime, 'mm:ss'),
      percentage = this.getPercentage(currentTime, startTime);

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
      </div>
    );
  }
}

// <TimerConfiguration/>
export default Pomodoro;
