import React, { Component } from 'react';
import './styles/Task.scss';
import uuidv4 from 'Utils/uuid';
import Time from 'Utils/Time';
import PropTypes from 'prop-types';
import AutogrowTextarea from './AutogrowTextarea';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: props.taskData.start || Time.getTime('hh:mm'),
      end: props.taskData.end || '',
      name: props.taskData.name || '',
      id: props.taskData.id || uuidv4(),
      period: props.taskData.period || '00:00'
    };

    this.refNameElement = React.createRef();

    this.inputHandler = this.inputHandler.bind(this);
    this.updateStart = this.updateStart.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  changeTask(task) {
    const { onChange } = this.props;

    onChange(task);
  }

  removeTask() {
    const { onRemove } = this.props,
      { id } = this.state;

    onRemove(id);
  }

  calculatePeriod(start, end) {
    if( !Time.isTime(start) && !Time.isTime(end) ) return '00:00';

    const startArr = start.split(':'),
      endArr = end.split(':');

    let hours = parseInt(endArr[0]) - parseInt(startArr[0]),
      minutes = parseInt(endArr[1]) - parseInt(startArr[1]);

    hours = (minutes < 0) ? hours - 1 : hours;
    minutes = (minutes < 0) ? minutes + 60 : minutes;
    hours = (hours < 0) ? hours + 24 : hours;
    return `${(hours > 9 ? hours : (`0${hours}`))}:${(minutes > 9 ? minutes : (`0${minutes}`))}`;
  }

  changeStartTime(start) {
    const { id, end, name } = this.state,
      period = this.calculatePeriod(start, end);

    this.setState({ start, period });
    this.changeTask({ id, start, end, name, period });
  }

  changeEndTime(end) {
    const { id, start, name } = this.state,
      period = this.calculatePeriod(start, end);

    this.setState({ end, period });
    this.changeTask({ id, start, end, name, period });
  }

  changeName(value, target) {
    const { id, start, end, period } = this.state;

    this.setState({ name: value });
    this.changeTask({ id, start, end, name: value, period });
  }

  copyTime = e =>{
    const str = e.target.innerText,
      { onCopy } = this.props;

    onCopy(str);
  }

  inputHandler(e) {

    const field = e.target.name,
      { value } = e.target;

    switch (field) {
      case 'start':
        this.changeStartTime(value);
        break;
      case 'end':
        this.changeEndTime(value);
        break;
      case 'name':
        this.changeName(value, e.target);
        break;
      default:
        return;
    }
  }

  updateStart() {

    const time = Time.getTime('hh:mm');

    this.changeStartTime(time);
  }

  updateEnd() {
    const time = Time.getTime('hh:mm');

    this.changeEndTime(time);
  }

  render() {
    const { start,
        end,
        name,
        period
      } = this.state,
      timeStr = Time.parseTimeFormat(period, 'dhdm');



    return (
      <div className="task">
        <input type="time" className="task__time-input startTime" title="Start time"
          name="start"
          value={ start }
          onChange={ this.inputHandler }/>
        <button type="button" className="task__time-button startBtn far fa-clock"
          name="start time button"
          aria-label="Start time"
          onClick={ this.updateStart }></button>
        <span>&mdash;&nbsp;</span>
        <input type="time" className="task__time-input endTime"
          name="end"
          value={ end }
          onChange={ this.inputHandler }/>
        <button type="button" className="task__time-button endBtn far fa-clock"
          name="end time button"
          aria-label="End time"
          onClick={ this.updateEnd }></button>
        <AutogrowTextarea
          className = "task__name"
          value={ name }
          onChangeValue={this.changeName}/>
        <span className="task__period"
          onClick={ this.copyTime }>{timeStr}</span>
        <button type="button" className="task__delete-button deleteBtn far fa-trash-alt"
          name="delete task button"
          aria-label="Delete task"
          onClick={ this.removeTask }></button>
      </div>
    );
  }
}

export default Task;


Task.propTypes = {
  taskData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    period: PropTypes.string
  }),
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  onCopy: PropTypes.func
};
