import React, { useState } from 'react';
import clsx from 'clsx';
import {
  node,
  string,
  bool,
  oneOfType,
  number,
  func,
} from 'prop-types';
import { RadioGroupProvider } from './RadioGroupProvider';
import './RadioGroup.css';

function RadioGroup({
  children,
  classname,
  name,
  horizontal,
  selectedValue,
  onChange,
  ...props
}) {
  const [value, updateSelection] = useState(selectedValue);
  const handlechange = (e) => {
    updateSelection(e.target.value);
    onChange(e);
  };
  return (
    <RadioGroupProvider
      selectedValue={value}
      name={name}
      onChange={handlechange}
      horizontal={horizontal}
      {...props}
    >
      <div role="radiogroup" data-testid="radio-group" className={clsx(classname, 'radio-group-component', horizontal ? 'radio-group-component--horizontal' : 'radio-group-component--vertical')} {...props}>
        {children}
      </div>
    </RadioGroupProvider>
  );
}

RadioGroup.propTypes = {
  children: node.isRequired,
  name: string,
  classname: string,
  horizontal: bool,
  selectedValue: oneOfType([string, number, bool]).isRequired,
  onChange: func,
};

RadioGroup.defaultProps = {
  name: '',
  classname: '',
  horizontal: false,
  onChange: () => {},
};

export default RadioGroup;
