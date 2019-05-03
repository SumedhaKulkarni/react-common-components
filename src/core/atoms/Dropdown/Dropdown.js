import React from 'react';
import clsx from 'clsx';
import {
  string, bool, func, arrayOf,
} from 'prop-types';
import './Dropdown.css';

function Dropdown({
  classname,
  placeholder,
  options,
  selected,
  disabled,
  size,
  clickHandler,
  required,
  ...props
}) {
  const selectedValue = placeholder || selected;
  const changeEvent = (e) => {
    clickHandler(e);
  };
  return (
    <div className={clsx(classname, size, 'dropdown-component')}>
      <select
        defaultValue={selectedValue}
        disabled={disabled}
        onChange={changeEvent}
        required={required}
        data-testid="dropdown"
        {...props}
      >
        {(() => {
          if (placeholder) {
            return <option value="" key={placeholder} hidden>{placeholder}</option>;
          }
          return undefined;
        })()}
        {options.map(option => <option value={option} key={option}>{option}</option>)}
      </select>
    </div>
  );
}

Dropdown.propTypes = {
  classname: string,
  placeholder: string,
  options: arrayOf.isRequired,
  selected: string,
  disabled: bool,
  size: string,
  clickHandler: func,
  required: bool,
};

Dropdown.defaultProps = {
  classname: '',
  placeholder: '',
  selected: '',
  disabled: false,
  size: '',
  clickHandler: () => { },
  required: false,
};

export default Dropdown;
