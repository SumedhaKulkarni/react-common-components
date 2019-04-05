import React from 'react';
import clsx from 'clsx';
import {
  node, string, bool, func,
} from 'prop-types';
import './Link.css';
import Button from '../Button/Button';

function LinkComp({
  classname,
  isInternal,
  clickEvent,
  appearance,
  size,
  address,
  children,
  ...props
}) {
  if (isInternal) {
    return (
      <div className={clsx(classname, 'link-component')}>
        <Button
          handleClick={clickEvent}
          appearance={appearance}
          size={size}
          {...props}
        >
          {children}
        </Button>
      </div>
    );
  }
  return (
    <div className={clsx(classname, appearance, size, 'link-component')}>
      <a
        href={address}
        data-testid="link"
        {...props}
      >
        {children}
      </a>
    </div>
  );
}

LinkComp.propTypes = {
  children: node.isRequired,
  isInternal: bool.isRequired,
  clickEvent: func,
  classname: string,
  appearance: string,
  size: string,
  address: string,
};

LinkComp.defaultProps = {
  classname: '',
  clickEvent: () => {},
  appearance: '',
  size: 'medium',
  address: '',
};

export default LinkComp;
