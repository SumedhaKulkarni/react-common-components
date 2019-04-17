import React, { useContext } from 'react';
import clsx from 'clsx';
import {
  node,
  string,
  bool,
  oneOf,
  func,
} from 'prop-types';
import './RadioOption.css';
import Label from '../Label/Label';
import { RadioGroupContext } from '../../molecules/RadioGroup/RadioGroupProvider';

function RadioOption({
  children,
  label,
  name,
  value,
  size,
  disabled,
  onChange,
  classname,
  checked,
  ...props
}) {
  const context = useContext(RadioGroupContext);
  const {
    name: contextName,
    onChange: handleSelectionChange,
    selectedValue,
    horizontal,
  } = context || {};

  const onSelection = (e) => {
    onChange(e);
    if (context) {
      handleSelectionChange(e);
    }
  };
  return (
    <Label
      htmlFor={label}
      size={size}
      data-testid="radio-option"
      classname={
        clsx(
          classname,
          'radio-option',
          { 'radio-option--selected': (label === selectedValue) || checked, 'radio-option--disabled': disabled, 'radio-option--horizontal': horizontal },
        )}
    >
      <input
        type="radio"
        id={label}
        className={clsx('radio-option__input', { 'radio-option__input--selected': (label === selectedValue) || checked, 'radio-option__input--disabled': disabled })}
        name={contextName || name}
        value={label}
        disabled={disabled}
        checked={(label === selectedValue) || checked}
        aria-checked={(label === selectedValue) || checked}
        data-testid="radio-option-input"
        onChange={onSelection}
        {...props}
      />
      {children || value}
    </Label>
  );
}
RadioOption.propTypes = {
  children: node,
  label: string.isRequired,
  value: string,
  name: string,
  size: oneOf(['medium', 'large', 'extra-large', 'small', 'extra-small']),
  disabled: bool,
  onChange: func,
  classname: string,
  checked: bool,
};

RadioOption.defaultProps = {
  children: null,
  name: '',
  value: '',
  size: 'medium',
  disabled: false,
  onChange: () => {},
  classname: '',
  checked: false,
};

export default RadioOption;
