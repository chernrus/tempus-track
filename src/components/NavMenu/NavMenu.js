import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.scss';

function NavMenu() {
  return (
    <nav className="navbar">
      <ul className="navbar-bar">
        <li className="navbar__link"><NavLink to={'/tracking'}>Tracker</NavLink></li>
        <li className="navbar__link"><NavLink to={'/desk'}>Desk</NavLink></li>
        <li className="navbar__link"><NavLink to={'/pomodoro'}>Pomodoro</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavMenu;
