import { Component } from 'react';
import PropTypes from 'prop-types';
import * as SC from './Modal.styled';
import { createPortal } from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.clearImage();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.clearImage();
    }
  };

  render() {
    return createPortal(
      <SC.Overlay onClick={this.handleBackdropClick}>
        <SC.Modal>{this.props.children}</SC.Modal>
      </SC.Overlay>,
      ModalRoot
    );
  }
}

Modal.propTypes = {
  handleBackdropClick: PropTypes.func,
};
