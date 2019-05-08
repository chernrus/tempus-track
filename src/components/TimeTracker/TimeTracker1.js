import React, { Component } from 'react';
import Time from 'Utils/Time';
import { helper as _ } from 'Utils/helper';
import uuidv4 from 'Utils/uuid';
// import TaskList from 'Components/TaskList';
// import CreateTaskButton from 'Components/CreateTaskButton';
// import TotalTime from 'Components/TotalTime';
// import CalculatedList from 'Components/CalculatedList';
// import CalculateButton from 'Components/CalculateButton';
// import ClearButton from 'Components/ClearButton';
import './TimeTracker.scss';

class TimeTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      data: [],
      calcListIsShow: false
    };

    this.loadData();

    this.calculateTasks = this.calculateTasks.bind(this);
    this.removeAllTask = this.removeAllTask.bind(this);
    this.createTask = this.createTask.bind(this);
    this.changeTask = this.changeTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  loadData() {
    _.getData('timeTasks')
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

  saveData(data) {
    window.localStorage.setItem('timeTasks', JSON.stringify(data));
    this.setState({ data });
  }

  calculateTasks() {
    console.log('Calculate all tasks');
    this.setState({ calcListIsShow: true});
  }

  removeAllTask() {
    console.log('Remove all tasks');
    this.setState({ data: [] });
    this.saveData([]);
  }

  createTask() {
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

  changeTask( task ) {
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

  removeTask( id ) {
    console.log('Remove Task');
    const { data } = this.state;

    data.forEach((task, i) => {
      if(task.id === id) {
        data.splice(i, 1);
      }
    });

    this.saveData(data);
  }

  calculateTime(data) {
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

      return (
        <h2>TimeTracker</h2>
      );
    // return (
    //   <div className="time-tracker">
    //     <div className="time-tracker__header">
    //       <CalculateButton onCalculate={ this.calculateTasks }/>
    //       <ClearButton onRemove={ this.removeAllTask }/>
    //     </div>
    //     <TaskList
    //       data={ data }
    //       onChange={ this.changeTask }
    //       onRemove={ this.removeTask }
    //       onCopy={ _.copyToClipboard }/>
    //     <div className="time-tracker__footer">
    //       <CreateTaskButton
    //         onCreate={ this.createTask }/>
    //       <TotalTime
    //         time={ time }
    //         onCopy={ _.copyToClipboard }/>
    //     </div>
    //     {calcListIsShow && <CalculatedList data={ data } onCopy={ _.copyToClipboard }/>}
    //   </div>
    // );
  }
}

export default TimeTracker;
