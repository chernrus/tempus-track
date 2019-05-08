import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/TotalTime.scss';

class TotalTime extends Component {

  copyTime = e =>{
    const str = e.target.innerText,
      { onCopy } = this.props;

    onCopy(str);
  }

  render() {
    const { time } = this.props;

    return (
      <div className="total-time">
          Всего&nbsp;
          <span className="total-time__time" onClick={this.copyTime}>{ time }</span>
      </div>
    );
  }
}

export default TotalTime;

TotalTime.propTypes = {
  time: PropTypes.string
};
