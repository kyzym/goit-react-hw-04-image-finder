import PropTypes from 'prop-types';
import * as SC from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const ModalRoot = document.querySelector('#modal-root');

export const Modal = ({ clearImage, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        clearImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearImage]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      clearImage();
    }
  };

  return createPortal(
    <SC.Overlay onClick={handleBackdropClick}>
      <SC.Modal>{children}</SC.Modal>
    </SC.Overlay>,
    ModalRoot
  );
};

Modal.propTypes = {
  handleBackdropClick: PropTypes.func,
};
