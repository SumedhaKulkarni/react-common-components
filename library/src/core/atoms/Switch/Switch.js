import React, { useState } from 'react';
import clsx from 'clsx';
import {
  node, string, bool, func,
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
  ...props
}) {
  const [isChecked, toggleCheck] = useState(checked);
  const clickHandler = (e) => {
    toggleCheck(!isChecked);
    handleToggle(e, isChecked);
  };

  return (
    <div className={clsx(classname, 'switch-component')}>
      <Label className="switch" htmlFor="input-switch">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          onChange={clickHandler}
          id="input-switch"
          data-testid="input-switch"
          {...props}
        />
        <div className="slider round">
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
};

Switch.defaultProps = {
  classname: '',
  checked: false,
  disabled: false,
  onText: 'ON',
  offText: 'OFF',
};

export default Switch;
