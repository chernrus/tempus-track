import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainHeader from 'Components/MainHeader';
import Home from 'Components/Home';
import About from 'Components/About';
import Contact from 'Components/Contact';
import './App.scss';


class App extends Component {
  constructor() {
    super();
    this.mainContainer = React.createRef();
    // this.mainHeader = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <MainHeader/>
        <div className="app-container container">
          <Switch>
            <Route exact path='/tracking' component={Home} />
            <Route path='/desk' component={Contact} />
            <Route path='/pomodoro' component={About} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

// <SideMenu/>
// // <MainHeader ref={ this.mainHeader } title="asdf"/>
