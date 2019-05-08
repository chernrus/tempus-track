import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalculateButton extends Component {

  onCalculate = () => {
    this.props.onCalculate();
  }

  render() {

    return (
      <button
        className="button-calculate" type="button" name="calc-btn"
        onClick={this.onCalculate}>
          Calculate
      </button>
    );
  }
}

export default CalculateButton;

CalculateButton.propTypes = {
  onRemoveAll: PropTypes.func
};
