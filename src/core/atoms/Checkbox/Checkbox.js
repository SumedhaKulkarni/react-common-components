import React, { useState } from 'react';
import clsx from 'clsx';
import {
  node, string, bool, func,
} from 'prop-types';
import './Checkbox.css';

const id = `check${Math.floor(100000 + Math.random() * 900000)}`;

function Checkbox({
  classname,
  displayTextClassname,
  appearance,
  value,
  displayText,
  isChecked,
  disabled,
  handleChange = () => { },
  ...props
}) {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    handleChange(e.target.checked, value);
  };

  return (
    <div className={clsx(classname, appearance, 'checkbox-component')}>
      <label data-testid="checkbox-text" htmlFor={id} className={clsx(displayTextClassname, 'checkbox-text', 'checkbox-container')}>{displayText}
        <input
          id={id}
          type="checkbox"
          value={value}
          checked={checked}
          aria-checked={checked}
          disabled={disabled}
          tabIndex="0"
          onChange={handleCheckboxChange}
          data-testid="checkbox"
          {...props}
        />
        <span className="checkmark" />
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  disabled: bool,
  value: string,
  displayText: string,
  isChecked: bool,
  handleChange: func.isRequired,
  classname: string,
  displayTextClassname: string,
  appearance: string,
};

Checkbox.defaultProps = {
  disabled: false,
  classname: '',
  value: '',
  isChecked: false,
  displayTextClassname: '',
  appearance: '',
  displayText: '',
};

export default Checkbox;
