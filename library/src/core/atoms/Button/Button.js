import React from 'react';
import clsx from 'clsx';
import {
  node, string, bool, func,
} from 'prop-types';
import './Button.css';

function Button({
  classname,
  appearance,
  size,
  children,
  disabled,
  handleClick,
  ...props
}) {
  const clickHandler = (e) => {
    handleClick(e);
  };

  return (
    <div className={clsx(classname, appearance, size, 'button-component')}>
      <button
        type="button"
        disabled={disabled}
        onClick={clickHandler}
        data-testid="button"
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: node.isRequired,
  disabled: bool,
  handleClick: func.isRequired,
  classname: string,
  appearance: string,
  size: string,
};

Button.defaultProps = {
  disabled: false,
  classname: '',
  appearance: '',
  size: '',
};

export default Button;
