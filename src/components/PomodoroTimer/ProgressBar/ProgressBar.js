import React, { Component } from 'react';
import './ProgressBar.scss';

class ProgressBar extends Component {

  render() {

    const {
      mode,
      sqSize,
      strokeWidth,
      percentage,
      backgroundColor,
      trackColor } = this.props,

      radius = (sqSize - strokeWidth) / 2,
      viewBox = `0 0 ${sqSize} ${sqSize}`,
      dashArray = radius * Math.PI * 2,
      dashOffset = dashArray - dashArray * percentage / 100;

    let modeText = '',
      { text, textColor, progressColor } = this.props;

    switch (mode) {
      case 'focus':
        progressColor = '#d9534f';
        modeText = 'Get focused';
        break;
      case 'break':
        progressColor = '#5cb85c';
        modeText = 'Take a short break';
        break;
      case 'longBreak':
        progressColor = '#decd54';
        modeText = 'Take a long break';
        break;
      default:
        progressColor = '#d9534f';
        modeText = 'Get focused';
    }

    if(!text) text = `${percentage}%`;
    if(!textColor) textColor = progressColor;

    return (
      <svg
        width={ sqSize }
        height={ sqSize }
        viewBox={ viewBox }>
        <circle
          className="circle-background"
          cx={ sqSize / 2 }
          cy={ sqSize / 2 }
          r={radius}
          style={{
            fill: backgroundColor
          }}/>
        <circle
          className="circle-track"
          cx={ sqSize / 2 }
          cy={ sqSize / 2 }
          r={radius}
          strokeWidth={ `${strokeWidth}px` }
          style={{
            stroke: trackColor
          }}/>
        <circle
          className="circle-progress"
          cx={ sqSize / 2 }
          cy={ sqSize / 2 }
          r={ radius }
          strokeWidth={ `${strokeWidth}px` }
          // Start progress marker at 12 O'Clock
          transform={ `rotate(-90 ${sqSize / 2} ${sqSize / 2})` }
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            stroke: progressColor
          }}/>
        <text
          className="circle-text"
          x="50%"
          y="40%"
          dy=".3em"
          textAnchor="middle"
          style={{
            fill: textColor
          }}>
          { `${text}` }
        </text>
        <text
          className="mode-text"
          x="50%"
          y="70%"
          dy=".3em"
          textAnchor="middle"
          style={{
            fill: textColor
          }}>
          { `${modeText}` }
        </text>
      </svg>
    );
  }
}

ProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10,
  progressColor: '#d9534f',
  backgroundColor: 'none',
  trackColor: '#ddd'
};


export default ProgressBar;
