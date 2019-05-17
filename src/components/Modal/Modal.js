import React, { Component } from 'react';
import './Modal.scss';

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <span className="close" onClick={props.onClose}>&times;</span>
        {props.children}
      </div>
    </div>
  )
}

export default Modal;
