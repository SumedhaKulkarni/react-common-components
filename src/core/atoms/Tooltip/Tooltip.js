import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  string, bool, oneOf, node,
} from 'prop-types';
import './Tooltip.scss';

function Tooltip({
  classname,
  text,
  position,
  type,
  displayOnClick,
  isHtml,
  children,
}) {
  const [displayTooltip, setDisplayTooltip] = useState(false);

  const hideTooltip = () => {
    setDisplayTooltip(false);
  };

  const showTooltip = () => {
    setDisplayTooltip(true);
  };

  const handleClick = (e) => {
    const target = e.target.className;
    if (target === 'tooltip-trigger') {
      return showTooltip();
    }
    return hideTooltip();
  };

  useEffect(() => {
    if (displayOnClick) {
      document.addEventListener('click', handleClick);
      return (() => {
        document.removeEventListener('click', handleClick);
      });
    }
    return undefined;
  }, []);

  return (
    <span className={clsx(classname, 'tooltip')}>
      {displayTooltip
                && (
                <div data-testid="tooltip-bubble" className={`tooltip-bubble tooltip-${position} tooltip-${type}`}>
                  {isHtml
                    ? <div className={`tooltip-message ${type}`} dangerouslySetInnerHTML={{ __html: text }} />
                    : <div className={`tooltip-message ${type}`}>{text}</div>}
                </div>
                )
            }
      {displayOnClick
        ? (
          <div
            data-testid="tooltip-trigger"
            className="tooltip-trigger"
            role="presentation"
            onClick={handleClick}
            onKeyDown={handleClick}
          >
            {children}
          </div>
        )
        : (
          <div
            data-testid="tooltip-trigger"
            className="tooltip-trigger"
            role="presentation"
            onMouseOver={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
          >
            {children}
          </div>
        )
            }

    </span>
  );
}

Tooltip.propTypes = {
  text: string,
  classname: string,
  position: oneOf(['left', 'bottom', 'right', 'top']),
  children: node.isRequired,
  isHtml: bool,
  displayOnClick: bool,
  type: oneOf(['info', 'alert', 'warning', 'success', 'dark']),
};

Tooltip.defaultProps = {
  text: '',
  classname: '',
  position: 'right',
  type: 'dark',
  displayOnClick: false,
  isHtml: false,
};

export default Tooltip;
