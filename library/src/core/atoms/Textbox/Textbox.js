import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import {
  node,
  string,
  bool,
  func,
  oneOf
} from 'prop-types';
import './Textbox.css'

function Textbox({
  classname,
  children,
  readOnly,
  value,
  handleChange,
  type,
  ariaLabel,
  isRequired,
  canClear,
  placeHolder,
  ...props
}) {
  const [textValue, setTextValue] = useState(value);

  let textInput = useRef(null);

  const updateTextValue = (e) => {
    setTextValue(e.target.value)
    handleChange(e)
  }
  const clearField = () => {
    setTextValue('')
    textInput.current.focus()
  }

  return (
    <div className={clsx(classname, 'textbox-component', {'disabled': readOnly})}>
      <input
        type={type}
        value={textValue}
        onChange={updateTextValue}
        readOnly={readOnly}
        aria-label={ariaLabel}
        required={isRequired}
        aria-required={isRequired}
        placeholder={placeHolder}
        data-testid="textbox"
        ref={textInput}
        className={clsx({'disabled': readOnly})}
        {...props}
      />
      { canClear &&
        !readOnly &&
        textValue.length > 0 &&
        <span
          className="clear"
          role="button"
          tabIndex="0"
          aria-pressed="false"
          aria-label="clear-textbox"
          onClick={clearField}
          onKeyPress={(e) => {if(e.key === 'Enter') {clearField(e)}}}
          data-testid="clear-textbox">
          &times;
        </span>}
      {children}
    </div>
  );
}

Textbox.propTypes = {
  children: node,
  handleChange: func,
  readOnly: bool,
  classname: string,
  value: string,
  type: oneOf(['text', 'email', 'password']),
  ariaLabel: string,
  isRequired: bool,
  canClear: bool,
  placeHolder: string
};

Textbox.defaultProps = {
  children: null,
  handleChange: () => {},
  readOnly: false,
  classname: '',
  value: '',
  type: 'text',
  ariaLabel: 'textbox',
  isRequired: false,
  canClear: true,
  placeHolder: ''
};

export default Textbox;
