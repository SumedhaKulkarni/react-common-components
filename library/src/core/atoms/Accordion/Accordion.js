import React, { useState } from 'react';
import clsx from 'clsx';
import {
  node, bool, number, func, arrayOf,
} from 'prop-types';
import './Accordion.css';

function Accordion({ children, openMutilpePanes, preSelectedPanes }) {
  const [activeIndexes, setActivePanes] = useState(preSelectedPanes || []);
  /**
   * Method used to expand or collapse the accordion panel
   * based on the state of selected indexes
   * @param {*} index : number
   */
  function toggle(index) {
    // if there is atleast one expanded panel
    if (activeIndexes.length > 0) {
      // check if the current clicked panel is already in expanded state
      const isExpanded = activeIndexes.indexOf(index) >= 0;
      // check if multiple panels can be expanded simultaneously
      if (openMutilpePanes) {
        const selectedPanes = Object.assign([], activeIndexes);
        isExpanded ? selectedPanes.splice(activeIndexes.indexOf(index), 1) : selectedPanes.push(index); //eslint-disable-line
        setActivePanes(selectedPanes);
        return;
      }
    isExpanded ? setActivePanes([]) : setActivePanes([index]); //eslint-disable-line
    } else {
      setActivePanes([index]);
    }
  }

  function isPanelExpanded(index) {
    return activeIndexes.indexOf(index) >= 0;
  }

  const accordion = React.Children.map(children, child => (
    React.cloneElement(child, {
      togglePane: toggle,
      isOpen: isPanelExpanded(child.props.index),
    })
  ));
  return (
    <div className="accordion-wrapper">
      {accordion}
    </div>
  );
}

Accordion.Title = ({
  children,
  isOpen,
  index,
  togglePane,
  ...props
}) => (
  <div
    role="heading"
    className={clsx(`accordion-title title-${index}`, { expanded: isOpen })}
    aria-expanded={isOpen}
    {...props}
  >
    <div
      onClick={() => togglePane(index)}
      onKeyPress={() => togglePane(index)}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  </div>
);

Accordion.Content = ({
  children,
  isOpen,
  index,
}) => (
  <div
    role="article"
    aria-hidden={isOpen}
    className={clsx(`accordion-content content-${index}`, isOpen ? 'show' : 'hide')}
    tabIndex={-1}
  >
    {children}
  </div>
);

Accordion.propTypes = {
  children: node.isRequired,
  openMutilpePanes: bool,
  preSelectedPanes: arrayOf(number),
};

Accordion.defaultProps = {
  openMutilpePanes: false,
  preSelectedPanes: [],
};

Accordion.Title.propTypes = {
  children: node.isRequired,
  isOpen: bool,
  index: number.isRequired,
  togglePane: func,
};

Accordion.Title.defaultProps = {
  togglePane: undefined,
  isOpen: undefined,
};

Accordion.Content.propTypes = {
  children: node.isRequired,
  isOpen: bool,
  index: number.isRequired,
};
Accordion.Content.defaultProps = {
  isOpen: undefined,
};

export default Accordion;
