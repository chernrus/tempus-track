import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClearButton extends Component {

  onRemoveAll = () => {
    this.props.onRemove();
  }

  render() {

    return (
      <button className="button-clear" type="button" name="clear-btn"
        onClick={this.onRemoveAll}>
          Clear
      </button>
    );
  }
}

export default ClearButton;

ClearButton.propTypes = {
  onRemoveAll: PropTypes.func
};
