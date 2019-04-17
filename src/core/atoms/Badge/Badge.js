import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  string, number, oneOf, oneOfType,
} from 'prop-types';
import './Badge.css';

function Badge({
  classname, count, effect, shape, ...props
}) {
  const badgeRef = useRef(null);
  useEffect(() => {
    let timer;
    if (effect !== '') {
      const currRef = badgeRef.current;
      currRef.classList.add(effect);
      timer = setTimeout(() => {
        currRef.classList.remove(effect);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [count, effect]);

  return (
    <div className="badge-wrapper">
      <span ref={badgeRef} className={clsx(classname, 'badge-component', shape)} {...props}>
        {count}
      </span>
    </div>
  );
}

Badge.propTypes = {
  count: oneOfType([string, number]).isRequired,
  classname: string,
  effect: oneOf(['bounce', 'scale', '']),
  shape: oneOf(['circle', 'oval']),
};

Badge.defaultProps = {
  classname: '',
  effect: '',
  shape: 'oval',
};

export default Badge;
