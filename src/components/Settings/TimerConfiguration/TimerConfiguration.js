import React, {Component} from 'react';
import './TimerConfiguration.scss';
import { loader } from 'Utils/loader';

class TimerConfiguration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusLength: 25,
      shortBreak: 5,
      longBreak: 30,
      goal: 12,
      sessionsInRound: 4
    };
  };

  componentWillMount() {
    this.loadSettings();
  }

  componentDidUpdate() {
    this.saveSettings();
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

  saveSettings = () => {
    const {
      focusLength,
      shortBreak,
      longBreak,
      sessionsInRound,
      goal
    } = this.state;

    loader.saveSettings({
        focusLength,
        shortBreak,
        longBreak,
        sessionsInRound,
        goal
      })
      .then(
        res => { console.log(res); },
        error => { console.log(error); }
      )
  }

  inputHandle = ({ target }) => {
    const name = target.name;
    let value = target.value;

    if(value < 0) {
      value = 0;
    };

    this.setState({
      [name]: value
    });

    // this.saveSettings();
  }

  render() {

    const {
      focusLength,
      shortBreak,
      longBreak,
      sessionsInRound,
      goal
    } = this.state;
    
    return (
      <div className="timer-config config">
        <div className="config__title">
          <h2>Timer Config</h2>
        </div>
        <div className="config__form">
          <div className="config__block">
            <h4>Timer Length (in minutes)</h4>

            <label>
              Focus length
              <input type="number" name="focusLength"
                value={focusLength}
                onChange={this.inputHandle}/>
            </label>
            <label>
              Short break length
              <input type="number" name="shortBreak"
                value={shortBreak}
                onChange={this.inputHandle}/>
            </label>
            <label>
              Long break length
              <input type="number" name="longBreak"
                value={longBreak}
                onChange={this.inputHandle}/>
            </label>
          </div>
          <div className="config__block">
            <h4>Focus session</h4>
            <label>
              Sessions per round
              <input type="number" name="sessionsInRound"
                value={sessionsInRound}
                onChange={this.inputHandle}/>
            </label>
            <label>
              Daily focus goal
              <input type="number" name="goal"
                value={goal}
                onChange={this.inputHandle}/>
            </label>
          </div>
        </div>
      </div>
    );
  }

}

export default TimerConfiguration;
