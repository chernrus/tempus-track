import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainLogo.scss';
import logo from '@/logo.svg';

function MainLogo() {
  return (
    <div className="main-logo">
      <Link to="/tracking" className="main-logo__link">
        <img className="main-logo__logo" src={logo} alt="logo"/>
      </Link>
    </div>
  );
};

export default MainLogo;
