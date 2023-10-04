import React, { Component } from 'react';
import css from './App.module.css';

export class Modal extends Component {
  handleOverlay = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

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
