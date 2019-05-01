import React, { useState, useRef, useEffect } from 'react';
import {
  string, node, func, bool,
} from 'prop-types';
import clsx from 'clsx';
import Textbox from '../../atoms/Textbox/Textbox';
import './Autosuggest.css';
import handleClickOutside from '../../common-hooks/useHandleClickOutside';

// this custom hook is used to set the value of autosuggest on click of the list item
export function useListSelection(value = '') {
  const [selectedItem, setSelectedItem] = useState(value);

  const setSelectedListItem = (val) => {
    setSelectedItem(val);
  };
  return { selectedItem, setSelectedListItem };
}

export function useVisibility(initialValue = false) {
  const [showListWrapper, setListVisibility] = useState(initialValue);
  const setListWrapper = (flag) => {
    setListVisibility(flag);
  };
  return { showListWrapper, setListWrapper };
}

export function Autosuggest({
  placeholder, children, selectedValue, textChange, showListContainer, isDisabled, classname,
}) {
  const listRef = useRef(null);
  const [listVisibility, setListVisibility] = useState(showListContainer);
  // handles the visibility of the list container
  useEffect(() => {
    setListVisibility(showListContainer);
  }, [showListContainer]);

  function hideList() {
    setListVisibility(false);
  }

  // hide the list container when clicked else where on the page
  useEffect(() => {
    const handler = handleClickOutside(listRef, hideList);
    document.addEventListener('click', handler);
    return (() => {
      document.removeEventListener('click', handler);
    });
  });


  function onTextChange(e) {
    textChange(e.target.value);
  }

  function onClearValue() {
    textChange('');
  }
  return (
    <div
      className={clsx(classname, 'autosuggest-wrapper')}
      ref={listRef}
      aria-haspopup="listbox"
      aria-expanded={listVisibility}
      data-testid="autosuggest-component"
    >
      <div className="text-container">
        <Textbox
          handleChange={onTextChange}
          handleClearValue={onClearValue}
          placeholder={placeholder}
          value={selectedValue}
          data-testid="autosuggest-searchbox"
          aria-autocomplete="list"
          aria-controls="autosuggest-list-container"
          disabled={isDisabled}
          classname="autosuggest-textbox"
        />
      </div>
      <div className="autosuggest-list-container" ref={listRef} aria-labelledby="autosuggest-list-container">
        {listVisibility && (
        <div className="list-items">
          {children}
        </div>
        )}
      </div>
    </div>
  );
}

Autosuggest.propTypes = {
  placeholder: string,
  children: node.isRequired,
  selectedValue: string,
  textChange: func.isRequired,
  showListContainer: bool,
  isDisabled: bool,
  classname: string,
};


Autosuggest.defaultProps = {
  placeholder: 'Search here',
  selectedValue: '',
  showListContainer: false,
  isDisabled: false,
  classname: '',
};
