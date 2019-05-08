import React, { Component } from 'react';
import './Pomodoro.scss';
// import * as ProgressBar from 'Utils/progressBar';
import ProgressBar from 'Components/ProgressBar';

class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: '14:45',
      percentage: 25
    }
  }

  render() {

    return (
      <div>
        <h2>Pomodoro</h2>
        <ProgressBar
          strokeWidth="10"
          sqSize="200"
          percentage={this.state.percentage}
          text={this.state.time}/>
      </div>
    );
  }
}

export default Pomodoro;
