import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SideMenu.scss';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerClassName: 'hamburger',
      menuClassName: 'side-menu'
    }

    this.showHideMenu = this.showHideMenu.bind(this);
  }

  showHideMenu() {
    let {
      menuClassName,
      hamburgerClassName
    } = this.state;

    // const mainContainer = this.props.main.current;

    switch (hamburgerClassName) {
      case 'hamburger':
        hamburgerClassName = 'hamburger change';
        menuClassName = 'side-menu opened';
        break;
      case 'hamburger change':
        hamburgerClassName = 'hamburger';
        menuClassName = 'side-menu';
        break;
      default:
        hamburgerClassName = 'hamburger change';
        menuClassName = 'side-menu opened';
    }

    // mainContainer.classList.toggle('change');

    this.setState({
      menuClassName,
      hamburgerClassName
    });
  }

  render() {
    const {
      menuClassName,
      hamburgerClassName
    } = this.state;

    return (
      <div className={ menuClassName }>
        <div className={ hamburgerClassName } onClick={ this.showHideMenu }>
          <div className="hamburger__bar1"></div>
          <div className="hamburger__bar2"></div>
          <div className="hamburger__bar3"></div>
        </div>
        <div className="side-menu__item">
          <a className="side-menu__time-tracker" href="#">
            <i className="side-menu__icon far fa-clock"></i>
            Time-tracker
          </a>
        </div>
        <div className="side-menu__item">
          <a className="side-menu__pomodoro" href="#">
            <i className="side-menu__icon far fa-hourglass"></i>
             Pomodoro
          </a>
        </div>
        <div className="side-menu__item">
          <a className="side-menu__desk" href="#">
            <i className="side-menu__icon far fa-calendar"></i>
            Desk
          </a>
        </div>
      </div>
    );
  }
}

export default SideMenu;


SideMenu.propTypes = {
  main: PropTypes.shape({
    current: PropTypes.node
  }),
  header: PropTypes.shape({
    current: PropTypes.node
  }),
};
