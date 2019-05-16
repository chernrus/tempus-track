import React, { Component } from 'react';
import './ProgressBar.scss';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const {
      sqSize,
      strokeWidth,
      percentage,
      progressColor,
      backgroundColor,
      trackColor } = this.props,

      radius = (sqSize - strokeWidth) / 2,
      viewBox = `0 0 ${sqSize} ${sqSize}`,
      dashArray = radius * Math.PI * 2,
      dashOffset = dashArray - dashArray * percentage / 100;

    let { text, textColor } = this.props;

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
          y="50%"
          dy=".3em"
          textAnchor="middle"
          style={{
            fill: textColor
          }}>
          { `${text}` }
        </text>
      </svg>
    );
  }
}

ProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10,
  progressColor: '#ff0000',
  backgroundColor: 'none',
  trackColor: '#ddd'
};


export default ProgressBar;
