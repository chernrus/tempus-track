import React, { Component } from 'react';

class InWork extends Component {
  render() {
    const styles = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '400px'
    };

    return (
        <div style={styles}>
          <h2>In developing. Comming soon.</h2>
        </div>
    );
  }
}

export default InWork;
