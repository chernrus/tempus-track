import React, { Component } from 'react';
import Pomodoro from './Pomodoro';
import PomodoroTask from './PomodoroTask';
import TimerConfiguration from 'Components/Settings/TimerConfiguration';
import Modal from 'Components/Modal';

class PomodoroTimer extends Component{

  constructor() {
    super();

    this.state = {
      modal: false
    }
  }

  openCloseModal = () => {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    console.log('hey');
    const {
      modal
    } = this.state;

    return (
      <div>
        <h2>Pomodoro (In developing)</h2>
        <button className="config-button" onClick={this.openCloseModal}>Config</button>
        <Pomodoro />
        {
          modal && <Modal onClose={this.openCloseModal}>
            <TimerConfiguration />
          </Modal>
        }
      </div>
    );
  }
}

export default PomodoroTimer;
