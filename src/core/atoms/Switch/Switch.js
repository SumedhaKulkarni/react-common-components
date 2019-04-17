import React, { useState } from 'react';
import clsx from 'clsx';
import {
  string, bool, func,
} from 'prop-types';
import './Switch.css';

import Label from '../Label/Label';

function Switch({
  classname,
  handleToggle,
  checked,
  disabled,
  onText,
  offText,
  htmlFor,
  ...props
}) {
  const [isChecked, toggleCheck] = useState(checked);
  const clickHandler = (e) => {
    toggleCheck(!isChecked);
    handleToggle(e, isChecked);
  };

  return (
    <div className={clsx(classname, 'switch-component')}>
      <Label className="switch" htmlFor={htmlFor}>
        <input
          type="checkbox"
          checked={isChecked}
          aria-checked={isChecked}
          disabled={disabled}
          aria-readonly={disabled}
          onChange={clickHandler}
          id={htmlFor}
          data-testid="input-switch"
          {...props}
        />
        <div className="slider">
          <span className="on" data-testid="input-on">{onText}</span>
          <span className="off" data-testid="input-off">{offText}</span>
        </div>
      </Label>
    </div>
  );
}

Switch.propTypes = {
  classname: string,
  handleToggle: func.isRequired,
  checked: bool,
  disabled: bool,
  onText: string,
  offText: string,
  htmlFor: string.isRequired,
};

Switch.defaultProps = {
  classname: '',
  checked: false,
  disabled: false,
  onText: 'ON',
  offText: 'OFF',
};

export default Switch;
