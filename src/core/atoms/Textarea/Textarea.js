import React, { useState } from 'react';
import clsx from 'clsx';
import {
  string, bool, func, number, arrayOf,
} from 'prop-types';
import Label from '../Label/Label';
import './Textarea.css';

function Textarea({
  classname,
  size,
  rows,
  label,
  placeholderText,
  defaultValue,
  allowResize,
  allowPaste,
  characterLimit,
  regEx,
  replaceString,
  handleChange,
}) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const onChange = (e) => {
    let { value } = e.target;
    if (regEx && regEx.length === 2) {
      const expression = new RegExp(regEx[0], regEx[1]);
      value = value.replace(expression, replaceString);
    }
    setInputValue(value);
    handleChange(value);
  };

  const onPaste = (e) => {
    if (!allowPaste) {
      e.preventDefault();
    }
  };

  return (
    <div className={clsx(classname, size, 'textarea-component')}>
      {label && <Label classname="textarea-component-label" size={size}>{label}</Label>}
      <textarea
        className={clsx(allowResize ? '' : 'no-resize')}
        value={inputValue}
        placeholder={placeholderText}
        onChange={onChange}
        onPaste={onPaste}
        rows={rows}
        maxLength={characterLimit || ''}
      />
    </div>
  );
}

Textarea.propTypes = {
  classname: string,
  size: string,
  label: string,
  rows: number,
  placeholderText: string,
  defaultValue: string,
  allowResize: bool,
  allowPaste: bool,
  characterLimit: string,
  regEx: arrayOf(string),
  replaceString: string,
  handleChange: func.isRequired,
};

Textarea.defaultProps = {
  classname: '',
  size: 'small',
  label: '',
  placeholderText: '',
  rows: 5,
  allowResize: true,
  allowPaste: true,
  characterLimit: '',
  defaultValue: '',
  replaceString: '',
  regEx: [],
};

export default Textarea;
