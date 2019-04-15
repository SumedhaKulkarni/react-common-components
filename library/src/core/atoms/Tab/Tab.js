import React, { useState } from 'react';
import {
  node,
  string,
  number,
  func,
  bool,
} from 'prop-types';
import clsx from 'clsx';
import Label from '../Label/Label';
import './Tab.css';

export default function Tabs({
  children,
  classname,
  selected,
  onChange,
  style,
  ...props
}) {
  const [activeIndex, updateActiveIndex] = useState(selected);
  function toggleTab(index, disabled = false) {
    if (!disabled) {
      updateActiveIndex(index);
      onChange(index);
      return true;
    }
    return false;
  }

  let tabsTitle = [];
  let tabsContent = [];
  React.Children.map(children, (child) => {
    const {
      index,
      title,
      disabled,
      ...tabProps
    } = child.props;
    const isActive = index === activeIndex;
    tabsTitle = [...tabsTitle, (
      <div
        role="heading"
        className={clsx(`tabs-component__title__item tabs-component__title__item--${index} tabs-component__title__item--${style}`, { 'tabs-component__title__item--active': isActive, 'tabs-component__title__item--disabled': disabled })}
        data-testid="tab-title-item"
        aria-expanded={isActive}
        aria-label={title}
        aria-level={1}
        aria-disabled={disabled}
        key={title}
        {...tabProps}
        {...props}
      >
        <Label
          data-testid="tab-title-item-label"
          onClick={() => toggleTab(index, disabled)}
          onKeyPress={() => toggleTab(index, disabled)}
          role="button"
          tabIndex={!disabled ? 0 : -1}
        >
          {title}
        </Label>
      </div>
    )];
    tabsContent = [...tabsContent, (
      index === activeIndex
        ? React.cloneElement(
          child, {
            selected: activeIndex,
            key: `content-${index}`,
          },
        )
        : null
    )];
  });

  return (
    <div className={clsx('tabs-component', classname, `tabs-component--${style}`)} data-testid="tab">
      <div className={clsx('tabs-component__title')} data-testid="tab-titles">
        { tabsTitle }
        { style === 'basic'
          ? <div className="tabs-component__active-bar" />
          : null
        }
      </div>
      <div className={clsx('tabs-component__content')} data-testid="tab-content">{tabsContent}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: node.isRequired,
  classname: string,
  selected: number,
  onChange: func,
  style: string,
};

Tabs.defaultProps = {
  classname: '',
  selected: undefined,
  onChange: () => {},
  style: 'card',
};

Tabs.Pane = ({
  children,
  index,
  selected,
  ...tabProps
}) => (
  <div
    data-testid="tab-content-item"
    role="article"
    aria-hidden={!(index === selected)}
    tabIndex={-1}
    className="tabs-component__content__item"
    {...tabProps}
  >
    {children}
  </div>
);

Tabs.Pane.propTypes = {
  children: node.isRequired,
  index: number,
  disabled: bool,
  selected: number,
};

Tabs.Pane.defaultProps = {
  index: undefined,
  disabled: false,
  selected: undefined,
};
