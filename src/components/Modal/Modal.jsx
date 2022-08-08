import React, { Component } from "react";
import css from './Modal.module.css';


export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  }

  onBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  }
  
  render() {
    return (
      <div className={css.Overlay} onClick={this.onBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>
    );
  };
}