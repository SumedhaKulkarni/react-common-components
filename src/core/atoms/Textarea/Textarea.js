import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  string, bool, func, number, arrayOf,
} from 'prop-types';
import Label from '../Label/Label';
import './Textarea.css';
import utils from '../../../utils/util';

const id = `textarea${utils.generateRandonNumber(6)}`;

function Textarea({
  classname,
  size,
  rows,
  label,
  disabled,
  placeholderText,
  defaultValue,
  allowResize,
  showRemainingCharacters,
  allowPaste,
  characterLimit,
  regEx,
  replaceString,
  handleChange,
}) {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (characterLimit && defaultValue && defaultValue.length > characterLimit) {
      setInputValue(inputValue.substr(0, characterLimit));
    }
  }, []);

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

  const limit = parseInt(characterLimit, 10);
  return (
    <div className={clsx(classname, size, 'textarea-component')}>
      {label && <Label htmlFor={id} data-testid="textarea-text" classname="textarea-component-label" size={size}>{label}</Label>}
      <textarea
        id={id}
        data-testid="textarea"
        disabled={disabled}
        className={clsx(allowResize ? '' : 'no-resize')}
        value={inputValue}
        placeholder={placeholderText}
        onChange={onChange}
        onPaste={onPaste}
        rows={rows}
        maxLength={characterLimit || ''}
      />
      {showRemainingCharacters && characterLimit
        && <div data-testid="limit" className="remaining-character">{`${limit - inputValue.length} characters left`}</div>}
    </div>
  );
}

Textarea.propTypes = {
  classname: string,
  size: string,
  label: string,
  disabled: bool,
  rows: number,
  placeholderText: string,
  defaultValue: string,
  allowResize: bool,
  allowPaste: bool,
  showRemainingCharacters: bool,
  characterLimit: string,
  regEx: arrayOf(string),
  replaceString: string,
  handleChange: func.isRequired,
};

Textarea.defaultProps = {
  classname: '',
  size: 'small',
  label: '',
  disabled: false,
  placeholderText: '',
  rows: 5,
  allowResize: true,
  allowPaste: true,
  showRemainingCharacters: true,
  characterLimit: '',
  defaultValue: '',
  replaceString: '',
  regEx: [],
};

export default Textarea;
