import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  string, func, bool, node,
} from 'prop-types';
import './Modal.css';


function Modal({
  classname,
  show,
  children,
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    const modalContentRef = modalRef.current.querySelector('.modal-content');
    if (show) {
      modalContentRef.classList.add('fadein');
      modalRef.current.style.display = 'flex';
    } else {
      modalContentRef.classList.remove('fadein');
      modalRef.current.style.display = 'none';
    }
  }, [show]);

  const modal = React.Children.map(children, child => (
    child
  ));
  return (
    <div data-testid="modal" ref={modalRef} className={clsx(classname, 'modal')}>
      <div data-testid="modal-content" className="modal-content">{modal}</div>
    </div>
  );
}

Modal.Header = ({
  children,
  onClose,
}) => (
  <header className={clsx('modal-header')}>
    {children}
    <span className="close-icon" onClick={onClose} onKeyPress={onClose} role="button" tabIndex="0" />
  </header>
);

Modal.Body = ({
  children,
}) => (
  <div className={clsx('modal-body')}>
    {children}
  </div>
);

Modal.Footer = ({
  children,
}) => (
  <footer className={clsx('modal-footer')}>
    {children}
  </footer>
);

Modal.propTypes = {
  show: bool,
  classname: string,
  children: node.isRequired,
};

Modal.defaultProps = {
  classname: '',
  show: false,
};
Modal.Header.propTypes = {
  children: node.isRequired,
  onClose: func.isRequired,
};
Modal.Body.propTypes = {
  children: node.isRequired,
};
Modal.Footer.propTypes = {
  children: node.isRequired,
};

export default Modal;
