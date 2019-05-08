import React, { Component } from 'react';
import Task from './Task';
import PropTypes from 'prop-types';
import './styles/TaskList.scss';

class TaskList extends Component {
  createTasks(data) {
    let tasks = [];

    data.forEach((taskData, i) => {
      tasks.push(
        <Task
          key={ taskData.id }
          taskData = { taskData }
          onChange = { this.props.onChange }
          onRemove = { this.props.onRemove }
          onCopy = { this.props.onCopy }/>
      )
    });
    return tasks;
  }

  render() {

    const { data } = this.props,
      tasks = this.createTasks(data);

    return (
      <div className="task-list">
        { tasks }
      </div>
    );
  }
}

export default TaskList;


TaskList.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  onCopy: PropTypes.func
};
