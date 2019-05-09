import React, { Component } from 'react';
import './PomodoroControl.scss';

class PomodoroControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onStart,
      onPause,
      onSkip
    } = this.props;

    return(
      <div className="pomodoro-control">
        <button className="pomodoro-control__strat" onClick={ onStart }>Start</button>
        <button className="pomodoro-control__pause" onClick={ onPause }>Pause</button>
        <button className="pomodoro-control__skip" onClick={ onSkip }>Skip</button>
      </div>
    )
  }
}

export default PomodoroControl;
