import React, { Component } from 'react';
import css from './App.module.css';

export class Modal extends Component {
  handleOverlay = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div onClick={this.handleOverlay} className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.modalData} alt="" />
        </div>
      </div>
    );
  }
}
