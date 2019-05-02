import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    string, bool, func, number, oneOf, node
} from 'prop-types';
import './Tooltip.scss';

function Tooltip({
    classname,
    text,
    position,
    type,
    children
}) {

    const [displayTooltip, setDisplayTooltip] = useState(false);

    const hideTooltip = () => {
        setDisplayTooltip(false);
    };

    const showTooltip = () => {
        setDisplayTooltip(true);
    };

    return (
        <span className={clsx(classname, 'tooltip')}
            onMouseLeave={hideTooltip}
        >
            {displayTooltip &&
                <div className={`tooltip-bubble tooltip-${position} tooltip-${type}`}>
                    <div className={`tooltip-message ${type}`}>{text}</div>
                </div>
            }
            <span
                className='tooltip-trigger'
                onMouseOver={showTooltip}
            >
                {children}
            </span>
        </span>
    )
}

Tooltip.propTypes = {
    text: string,
    position: oneOf(['left', 'bottom', 'right', 'top']),
    children: node,
    type: oneOf(['normal', 'alert', 'warning', 'success', 'dark'])
};

Tooltip.defaultProps = {
    text: '',
    position: 'right',
    type: 'warning'
};

export default Tooltip;