import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  string, number, func, bool, node, oneOf,
} from 'prop-types';
import './Toast.scss';
import { Transition } from 'react-transition-group';

export const POSITION = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
};
export const TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DEFAULT: 'default',
};
export const TRANSITION = {
  BOUNCE: {
    enterClass: 'Toastify__bounce-enter',
    exitClass: 'Toastify__bounce-exit',
    duration: 750,
    appendPosition: true,
  },
  SLIDE: {
    enterClass: 'Toastify__slide-enter',
    exitClass: 'Toastify__slide-exit',
    duration: [450, 750],
    appendPosition: true,
  },
  ZOOM: {
    enterClass: 'Toastify__zoom-enter',
    exitClass: 'Toastify__zoom-exit',
    duration: 750,
  },
  FLIP: {
    enterClass: 'Toastify__flip-enter',
    exitClass: 'Toastify__flip-exit',
    duration: 750,
  },
};

function Toast({
  showToast,
  closeButton,
  children,
  autoClose,
  onCloseToast,
  position,
  classname,
  type,
  transition,
  ...props
}) {
  const [isVisible, setVisibility] = useState(showToast);
  let enterDuration;
  let exitDuration;

  useEffect(() => {
    setVisibility(showToast);
  }, [showToast]);

  if (Array.isArray(transition.duration)) {
    [enterDuration, exitDuration] = transition.duration;
  } else {
    enterDuration = transition.duration;
    exitDuration = transition.duration;
  }

  const enterClassName = transition.appendPosition ? `${transition.enterClass}--${position}` : transition.enterClass;
  const exitClassName = transition.appendPosition ? `${transition.exitClass}--${position}` : transition.exitClass;

  const onEnter = (_node) => {
    setVisibility(true);
    _node.classList.add(enterClassName);
    // eslint-disable-next-line no-param-reassign
    _node.style.animationFillMode = 'forwards';
    // eslint-disable-next-line no-param-reassign
    _node.style.animationDuration = `${enterDuration * 0.001}s`;
  };
  const onEntered = (_node) => {
    _node.classList.remove(enterClassName);
    // eslint-disable-next-line no-param-reassign
    _node.style.cssText = '';
    if (autoClose !== false && autoClose !== 'false') {
      setTimeout(() => {
        setVisibility(false);
      }, autoClose);
    }
  };
  const onExit = (_node) => {
    _node.classList.add(exitClassName);
    // eslint-disable-next-line no-param-reassign
    _node.style.animationFillMode = 'forwards';
    // eslint-disable-next-line no-param-reassign
    _node.style.animationDuration = `${exitDuration * 0.001}s`;
  };
  const onExited = (_node) => {
    setVisibility(false);
    _node.classList.remove(exitClassName);
    // eslint-disable-next-line no-param-reassign
    _node.style.cssText = '';
  };

  return (
    <div
      data-testid="Toastify__toast-container"
      {...props}
      className={clsx('Toastify__toast-container', `Toastify__toast-container--${position}`)}
    >
      <Transition
        {...props}
        timeout={{
          enter: enterDuration,
          exit: exitDuration,
        }}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
        in={isVisible}
        unmountOnExit
      >
        {() => (
          <div
            data-testid="Toastify__toast"
            className={clsx('Toastify__toast', `Toastify__toast--${type}`)}
          >
            <div
              className={clsx('Toastify__toast-body', classname)}
            >
              {children}
            </div>
            {closeButton && (
            <div
              data-testid="Toastify__action"
              className={clsx('Toastify__action')}
            >
              <button type="button" onClick={onCloseToast}>
                <span className="cancel-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </span>
              </button>
            </div>
            )}
          </div>
        )}
      </Transition>
    </div>
  );
}

Toast.propTypes = {
  children: node.isRequired,
  showToast: bool,
  closeButton: bool,
  autoClose: (bool || number),
  onCloseToast: func,
  position: oneOf([POSITION.TOP_LEFT, POSITION.TOP_RIGHT, POSITION.TOP_CENTER,
    POSITION.BOTTOM_LEFT, POSITION.BOTTOM_RIGHT, POSITION.BOTTOM_CENTER]),
  onClose: func,
  classname: string,
  type: oneOf([TYPE.INFO, TYPE.SUCCESS, TYPE.WARNING, TYPE.ERROR, TYPE.DEFAULT]),
  transition: oneOf([TRANSITION.BOUNCE, TRANSITION.FLIP, TRANSITION.SLIDE, TRANSITION.ZOOM]),
};
Toast.defaultProps = {
  showToast: false,
  onClose: () => {},
  classname: '',
  autoClose: 5000,
  closeButton: false,
  onCloseToast: () => {},
  position: POSITION.BOTTOM_CENTER,
  type: TYPE.DEFAULT,
  transition: TRANSITION.BOUNCE,
};

export default Toast;
