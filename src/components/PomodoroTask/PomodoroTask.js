import React, { Component } from 'react';
import './PomodoroTask.scss';

class PomodoroTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: this.props.currentTask || ''
    };
  }

  inputHandle = ({ target }) => {
    const name = target.name;
    let value = target.value;

    if(value < 0) {
      value = 0;
    };

    if(value !== '') {

      this.setState({
        [name]: value
      });

    }
  }

  addNewPomodoroTask = () => {
    const { taskName } = this.state;

  }

  render() {
    const {
      taskName
    } = this.state;

    return(
      <div className="pomodoro-task">
        <div className="pomodoro-task__new-create">
          <input type="text"
            name="taskName"
            value={ taskName }
            onChange={ this.inputHandle }></input>
          <button onClick={ this.addNewPomodoroTask }>Add</button>
        </div>
        <div className="pomodoro-task__list">
          List
        </div>
      </div>
    );
  }

}

export default PomodoroTask;

// "{
//   "inited":true,
// "logged":false,
// "state":"paused",
// "mode":"pomodoro",
// "remains":1482861,
// "endtime":1557752249398,
// "paused":1557750767355,
// "resumed":1557750763357,
// "series":0,
// "started":1557750661573,
// "stopped":null,
// "delays":180032,
// "delay_limit":60000
// }"


// "{"inited":true,
// "logged":false,
// "state":"started",
// "mode":"pomodoro",
// "remains":1500000,
// "endtime":1557752537362,
// "paused":1557751009761,
// "resumed":1557751020790,
// "series":2,
// "started":1557751037362,
// "stopped":1557751022552,
// "delays":13985,
// "delay_limit":60000
// }"
