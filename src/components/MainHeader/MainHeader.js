import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavMenu from 'Components/NavMenu';
import MainLogo from 'Components/MainLogo';
import './MainHeader.scss';

function MainHeader(props) {
  const { title } = props;
  return (
    <div className="main-header container">
      <MainLogo/>
      <NavMenu/>
    </div>
  );
};

export default MainHeader;

MainHeader.propTypes = {
  title: PropTypes.string
};
