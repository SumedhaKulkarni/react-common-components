import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  string, func, bool, node, oneOf,
} from 'prop-types';
import './Modal.css';
import handleClickOutside from '../../common-hooks/useHandleClickOutside';


function Modal({
  classname,
  showModal,
  children,
  onClose,
  size,
  ...props
}) {
  const [isVisible, setVisibility] = useState(showModal);
  const modalRef = useRef(null);
  useEffect(() => {
    setVisibility(showModal);
  }, [showModal]);

  function closeModal() {
    setVisibility(false);
    onClose();
  }

  function handlekeyPress(e) {
    if (e.key === 'Enter') {
      setVisibility(false);
      onClose();
    }
  }

  useEffect(() => {
    const handler = handleClickOutside(modalRef, closeModal);
    if (isVisible) {
      document.addEventListener('click', handler);
    }
    return (() => {
      document.removeEventListener('click', handler);
    });
  });

  function handleEsc(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleEsc, false);
    }
    return (() => {
      document.removeEventListener('keydown', handleEsc, false);
    });
  });

  return (
    <div className={clsx(classname, 'modal', { show: isVisible })} {...props} data-testid="modal-container">
      <div className={clsx('modal-content', size)} ref={modalRef}>
        <span role="button" onKeyPress={handlekeyPress} tabIndex={0} className="close-icon" onClick={closeModal}> X </span>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: node.isRequired,
  classname: string,
  showModal: bool,
  onClose: func,
  size: oneOf(['large', 'medium', 'small']),
};

Modal.defaultProps = {
  classname: '',
  showModal: false,
  onClose: () => {},
  size: 'medium',
};

export default Modal;
