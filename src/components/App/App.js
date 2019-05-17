import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainHeader from 'Components/MainHeader';
import TimeTracker from 'Components/TimeTracker';
import PomodoroTimer from 'Components/PomodoroTimer';
import InWork from 'Components/InWork';
import './App.scss';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <MainHeader/>
        <div className="app-container container">
          <Switch>
            <Route exact path='/tracking' component={TimeTracker} />
            <Route path='/desk' component={InWork} />
            <Route path='/pomodoro' component={PomodoroTimer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
