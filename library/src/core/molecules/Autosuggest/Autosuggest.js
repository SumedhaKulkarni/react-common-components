import React, { useState, useRef, useEffect } from 'react';
import {
  string, node, func, bool,
} from 'prop-types';
import Textbox from '../../atoms/Textbox/Textbox';
import './Autosuggest.css';
import handleClickOutside from '../../common-hooks/useHandleClickOutside';

// this custom hook is used to set the value autosuggest on click of list item
export function useListSelection(value = '') {
  const [selectedItem, setSelectedItem] = useState(value);

  const setSelectedListItem = (val) => {
    setSelectedItem(val);
  };
  return [selectedItem, setSelectedListItem];
}

export function useVisibility() {
  const [visibility, setVisibility] = useState(false);
  const toggleVisibility = (flag) => {
    setVisibility(flag);
  };
  return [visibility, toggleVisibility];
}

export function Autosuggest({
  placeholder, charlimit, children, selectedValue, textChange, showListContainer,
}) {
  const listRef = useRef(null);
  const [listVisibility, setListVisibility] = useState(showListContainer);
  useEffect(() => {
    setListVisibility(showListContainer);
  }, [showListContainer]);

  function hideList() {
    setListVisibility(false);
  }

  useEffect(() => {
    const handler = handleClickOutside(listRef, hideList);
    document.addEventListener('click', handler);
    return (() => {
      document.removeEventListener('click', handler);
    });
  });


  function onTextChange(e) {
    if (charlimit < 1) {
      textChange(e.target.value);
    }
  }

  function onClearValue() {
    textChange('');
  }
  return (
    <div className="autosuggest-wrapper" ref={listRef}>
      <div className="text-container">
        <Textbox
          handleChange={onTextChange}
          handleClearValue={onClearValue}
          placeholder={placeholder}
          value={selectedValue}
        />
      </div>
      <div className="list-container" ref={listRef}>
        {false && (
        <div className="loader">
          Loading ...
        </div>
        )}
        {listVisibility && (
          <div className="list-container">
            <div className="list-items">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Autosuggest.propTypes = {
  placeholder: string,
  charlimit: Number,
  children: node.isRequired,
  selectedValue: string,
  textChange: func,
  showListContainer: bool,
};


Autosuggest.defaultProps = {
  placeholder: 'Search here',
  charlimit: 0,
  selectedValue: '',
  textChange: () => {},
  showListContainer: false,
};
