import React, { Component } from 'react';
import Time from 'Utils/Time';
import PropTypes from 'prop-types';
import AutogrowTextarea from './AutogrowTextarea';
import './styles/CalculatedList.scss';

class CalculatedList extends Component {

  sortData(data, field) {
    var sorted = data.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      })

    return sorted;
  }

  calcPeriod(start, end) {
    if( !Time.isTime(start) && !Time.isTime(end) ) return '00:00';

    var startArr = start.split(':'),
      endArr = end.split(':'),
      hours = parseInt(endArr[0]) - parseInt(startArr[0]),
      minutes = parseInt(endArr[1]) - parseInt(startArr[1]);

    hours = (hours < 0) ? hours + 24 : hours;
    hours = (minutes < 0) ? hours - 1 : hours;
    minutes = (minutes < 0) ? minutes + 60 : minutes;

    return `${(hours > 9 ? hours : (`0${hours}`))}:${(minutes > 9 ? minutes : (`0${minutes}`))}`;
  }

  sumTime(first, second) {
    var firstArr = first.split(':'),
      secondArr = second.split(':'),
      hours = parseInt(firstArr[0]) + parseInt(secondArr[0]),
      minutes = parseInt(firstArr[1]) + parseInt(secondArr[1]);

    hours = (minutes >= 60) ? hours + 1 : hours;
    minutes = (minutes >= 60) ? minutes - 60 : minutes;

    return `${(hours > 9 ? hours : (`0${hours}`))}:${(minutes > 9 ? minutes : (`0${minutes}`))}`;
  }

  calculateTimeSummary(firstT, secondT) {
    var period = secondT.period || this.calcPeriod(secondT.start, secondT.end),
      time = firstT ? this.sumTime(firstT.time, period) : period;

    return {time: time, name: secondT.name};
  }

  checkName(task) {
    return task.name === this.name;
  }

  calculate(data) {
    var dataCopy = JSON.parse(JSON.stringify(data)),
      sorted = this.sortData(dataCopy, 'name'),
      calculated = [],
      sumBuffer = null;

    for(var i = 0; i < sorted.length; i++) {
      if(calculated.find(this.checkName, sorted[i])) {
        continue;
      }
      else {
        var name = sorted[i].name;
        for(var j = 0; j < sorted.length; j++) {
          if(sorted[j].name === name) {
            sumBuffer = this.calculateTimeSummary(sumBuffer, sorted[j]);
          }
        }
        calculated.push(sumBuffer);
        sumBuffer = null;
      }
    }

    return calculated;
  };

  copyTime = e =>{
    const str = e.target.value,
      { onCopy } = this.props;

    onCopy(str);
  }

  createList(calculatedTasks) {
    const calcList = [];

      calculatedTasks.map((item) => {
        calcList.push(

          <div className="calculated-list__item" key={ item.name }>
            <div className="calculated-list__task-time" onClick={ this.copyTime }>{Time.parseTimeFormat(item.time, 'dhdm')}</div>
            <AutogrowTextarea
              value = { item.name || '~' }
              className = "calculated-list__task-name"
              onChangeValue= { this.changeName }
              readonly = { true }
              onClick={ this.copyTime }/>
          </div>
        )
        // <div className="calculated-list__task-name" onClick={this.copyTime}>{item.name || '~'}</div>
      });

      return calcList;
  }

  render() {

    const { data } = this.props,
      calculatedTasks = this.calculate(data),
      list = this.createList(calculatedTasks);

    return (
      <div className="calculated-list">
        <div className="calculated-list__hedaer">
          <div className="calculated-list__title-time">Time</div>
          <div className="calculated-list__title-name">Task name</div>
        </div>
        { list }
      </div>
    );
  }
}

export default CalculatedList;

CalculatedList.propTypes = {
  data: PropTypes.array,
  onCopy: PropTypes.func
};
