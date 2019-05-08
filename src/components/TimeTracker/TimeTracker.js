import React, { Component } from 'react';
import Time from 'Utils/Time';
import { helper as _ } from 'Utils/helper';
import { loader } from 'Utils/loader';
import uuidv4 from 'Utils/uuid';
import './TimeTracker.scss';
import {
  TaskList,
  TotalTime,
  CalculatedList,
  CreateTaskButton,
  CalculateButton,
  ClearButton
} from './TrackerComponents';

class TimeTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      data: [],
      calcListIsShow: false
    };
  }

  loadData = () => {
    loader.getData('timeTasks')
      .then(
        response => response,
        error => []
      )
      .then(
        (data) => {
          this.setState({ data: data });
        }
      );
  }

  componentWillMount() {
    this.loadData();
  }

  saveData = (data) => {
    loader.saveData('timeTasks', data)
      .then(
        res => {
          if(res.status === 'ok') {
            this.setState({ data });
          }
        },
        error => {
          this.setState({ error: true });
        }
      )
  }

  calculateTasks = () => {
    console.log('Calculate all tasks');
    this.setState({ calcListIsShow: true});
  }

  removeAllTask = () => {
    console.log('Remove all tasks');
    this.setState({ data: [] });
    this.saveData([]);
  }

  createTask = () => {
    console.log('Create tasks');

    const task = {
        name: '',
        start: '',
        end: '',
        period: '00:00',
        id: uuidv4()
      },
      { data } = this.state;

    data.push( task );

    this.setState({ data: data });
  }

  changeTask = ( task ) => {
    const { data } = this.state;
    let isValue = false;

    data.map((item)=>{
      if(item.id === task.id) {
        item.start = task.start;
        item.end = task.end;
        item.name = task.name;
        item.period = task.period;
        isValue = true;
      }
    });

    if(!isValue) { data.push(task) };

    this.saveData(data);
  }

  removeTask = ( id ) => {
    console.log('Remove Task');
    const { data } = this.state;

    data.forEach((task, i) => {
      if(task.id === id) {
        data.splice(i, 1);
      }
    });

    this.saveData(data);
  }

  calculateTime = (data) => {
    let time = '00:00';

    data.map((task) => {
      time = _.sumTime(time, task.period);
    });

    return Time.parseTimeFormat(time);
  }

  render() {
    const {
        data,
        calcListIsShow
      } = this.state,
      time = this.calculateTime(data);

    // return (
    //   <h2>TimeTracker</h2>
    // );
    return (
      <div className="time-tracker">
        <div className="time-tracker__header">
          <CalculateButton onCalculate={ this.calculateTasks }/>
          <ClearButton onRemove={ this.removeAllTask }/>
        </div>
        <TaskList
          data={ data }
          onChange={ this.changeTask }
          onRemove={ this.removeTask }
          onCopy={ _.copyToClipboard }/>
        <div className="time-tracker__footer">
          <CreateTaskButton
            onCreate={ this.createTask }/>
          <TotalTime
            time={ time }
            onCopy={ _.copyToClipboard }/>
        </div>
        {calcListIsShow && <CalculatedList data={ data } onCopy={ _.copyToClipboard }/>}
      </div>
    );
  }
}

export default TimeTracker;
