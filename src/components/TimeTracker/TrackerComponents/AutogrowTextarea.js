import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/AutogrowTextarea.scss';

class AutogrowTextarea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      rows: 1,
      minRows: 1,
      maxRows: 6,
      maxLength: 60,
      readonly: props.readonly || false,
      class: props.className || ''
    }

    this.refNameElement = React.createRef();

    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTimeout(this.handleChange, 50, { target: this.refNameElement.current });
  }

  handleChange = (event) =>{
    const textareaLineHeight = 18,
      { minRows, maxRows, value } = this.state,
      previousRows = event.target.rows,
      currentValue = event.target.value;

  	event.target.rows = minRows; // reset number of rows in textarea

		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }

		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}

  	this.setState({
    	value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
    // console.log('sdfsdfg');
    if(currentValue !== value) {
      this.props.onChangeValue(event.target.value);
    }
  }

  handleClick = (event) => {
    const { onClick } = this.props;

    if( onClick ) {
      onClick(event)
    }
  }

  render() {
    return (
      <textarea
        ref={this.refNameElement}
        name="name"
        className={`autogrow-textarea ${this.state.class}`}
        placeholder="Task name..."
				rows={this.state.rows}
				value={this.state.value}
				onChange={this.handleChange}
        maxLength={this.state.maxLength}
        readOnly={this.state.readonly}
        onClick={this.handleClick}
			/>
    );
  }
}

export default AutogrowTextarea;

AutogrowTextarea.propTypes = {
  value: PropTypes.string,
  onChangeValue: PropTypes.func
};
