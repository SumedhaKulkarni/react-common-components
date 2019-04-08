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
  address,
  children,
  target,
  ...props
}) {
  if (isInternal) {
    return (
      <div className={clsx(classname, 'link-component')}>
        <Button
          handleClick={clickEvent}
          {...props}
        >
          {children}
        </Button>
      </div>
    );
  }
  return (
    <div className={clsx(classname, 'link-component')}>
      <a
        href={address}
        data-testid="link"
        target={target}
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
  address: string,
  target: string,
};

LinkComp.defaultProps = {
  classname: '',
  clickEvent: () => {},
  address: '',
  target: '',
};

export default LinkComp;
