import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  node,
  string,
  bool,
  oneOf,
  number,
} from 'prop-types';
import './Progress.css';

function Progress({
  children,
  classname,
  percent,
  type,
  messageInside,
  strokeSize,
  fill,
  width,
  ...props
}) {
  // (120 / 2) - (12 / 2) = 54
  let radius;
  let circumference;
  if (type === 'circle') {
    radius = (width / 2) - (strokeSize / 2);
    circumference = 2 * Math.PI * radius;
  }

  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(percent > 100 ? 100 : percent);
  }, [percent]);
  return (
    <div data-testid="progress" className={clsx('progress', classname, { 'progress--cicle': type === 'circle' })} {...props}>
      {
        type === 'bar'
          ? (
            <div className="progress__bar">
              <svg
                className="progress__bar__line"
                data-testid="progress-bar"
                style={{
                  width: '100%',
                  height: `${strokeSize}px`,
                }}
              >
                <rect
                  rx="10"
                  ry="10"
                  style={{
                    width: '100%',
                    fill: '#d3d3d3',
                  }}
                />
                <rect
                  className="progress__bar__line__fill"
                  data-testid="progress-bar-line-fill"
                  rx="10"
                  ry="10"
                  style={{
                    width: `${count}%`,
                    fill,
                  }}
                />
              </svg>
              <div
                className={clsx('progress__bar__message progress__message', { 'progress__bar__message--inline': messageInside })}
                data-testid="progress-message"
                style={Object.assign({},
                  messageInside && (count < 5) && { left: 0 },
                  messageInside && (count >= 5) && { right: `${100 - count}%` })}
              >
                {children || `${count}%`}
              </div>
            </div>
          )
          : (
            <div className="progress__circle">
              <svg
                className="progress__circle__svg"
                width={width}
                height={width}
                viewBox={`0 0 ${width} ${width}`}
                data-testid="progress-circle"
              >
                <circle
                  className="progress-meter"
                  cx={width / 2}
                  cy={width / 2}
                  r={radius}
                  fill="none"
                  stroke="#d3d3d3"
                  strokeWidth={strokeSize}
                />
                <circle
                  className="progress-value"
                  cx={width / 2}
                  cy={width / 2}
                  r={radius}
                  fill="none"
                  stroke={fill}
                  strokeWidth={strokeSize}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (100 - count) / 100}
                  data-testid="progress-circle-fill"
                />
              </svg>
              <div
                className="progress__circle__message progress__message"
                style={{ padding: `${strokeSize}px` }}
                data-testid="progress-message"
              >
                {children || `${count}%`}
              </div>
            </div>
          )
        }
    </div>
  );
}

Progress.propTypes = {
  children: node,
  classname: string,
  percent: number.isRequired,
  type: oneOf(['bar', 'circle']),
  messageInside: bool,
  strokeSize: number,
  fill: string,
  width: number, // for Progress Circle
};

Progress.defaultProps = {
  children: null,
  classname: '',
  type: 'bar',
  messageInside: false,
  strokeSize: 20,
  fill: '#87ceeb',
  width: 120,
};

export default Progress;
