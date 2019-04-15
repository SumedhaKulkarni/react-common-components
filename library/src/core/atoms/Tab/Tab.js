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
  const [activeTabStyle, updateActiveTabStyle] = useState({ offset: 0, width: 0 });
  function updateBarStyle() {
    const tabStyle = activeTabStyle;
    children.every((child) => {
      if (child.props.index !== activeIndex) {
        console.log({ child });
        return true;
      }
      return false;
    });
    updateActiveTabStyle(tabStyle);
  }
  function toggleTab(index) {
    updateActiveIndex(index);
    updateBarStyle();
    onChange(index);
  }
  // console.log(React.Children[0]);
  const tabsTitle = React.Children.map(children, (child) => {
    const {
      index,
      title,
      disabled,
      ...tabProps
    } = child.props;
    const isActive = index === activeIndex;
    return (
      <div
        role="heading"
        className={clsx(`tabs-component__title__item tabs-component__title__item--${index} tabs-component__title__item--${style}`, { 'tabs-component__title__item--active': isActive, 'tabs-component__title__item--disabled': disabled })}
        data-testid="tab-title-item"
        aria-expanded={isActive}
        aria-label={title}
        aria-level={1}
        aria-disabled={disabled}
        {...tabProps}
        {...props}
      >
        <Label
          data-testid="tab-title-item-label"
          onClick={() => { if (!disabled) { toggleTab(index); } }}
          onKeyPress={() => (!disabled ? toggleTab(index) : null)}
          role="button"
          tabIndex={!disabled ? 0 : -1}
        >
          {title}
        </Label>
      </div>
    );
  });

  const tabsContent = React.Children.map(children, child => (
    child.props.index === activeIndex
      ? React.cloneElement(
        child, {
          selected: activeIndex,
        },
      )
      : null
  ));

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
  selected: undefined
};
