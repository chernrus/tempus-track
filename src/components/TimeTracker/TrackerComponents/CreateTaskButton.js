import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateTaskButton extends Component {

  createTask = () => {
    const { onCreate } = this.props;

    onCreate();
  }

  render() {

    return (
        <button className="create-task-button" type="button" name="add-btn"
          onClick={this.createTask}>+ Add</button>
    );
  }
}

export default CreateTaskButton;

CreateTaskButton.propTypes = {
  onCreate: PropTypes.func
};
