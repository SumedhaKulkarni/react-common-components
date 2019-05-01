import React from 'react';
import clsx from 'clsx';
import {
  node,
  string,
  bool,
  oneOf,
  number,
} from 'prop-types';
import './Progress.css';
import Label from '../../atoms/Label/Label';

function Progress({
  children,
  classname,
  message,
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
  return (
    <div className={clsx('progress', classname, { 'progress--cicle': type === 'circle' })} {...props}>
      {
        type === 'bar'
          ? (
            <div className="progress__bar">
              <div
                className="progress__bar__line"
                style={{ height: `${strokeSize}px` }}
              >
                <div
                  className="progress__bar__line__fill"
                  style={Object.assign({},
                    percent > 0
                    && { width: `${percent}%`, backgroundColor: fill, border: `solid 1px ${fill}` })}
                />
              </div>
              <div
                className={clsx('progress__bar__message', { 'progress__bar__message--inline': messageInside })}
                style={Object.assign({},
                  messageInside && (percent < 5) && { left: 0 },
                  messageInside && (percent >= 5) && { right: `${100 - percent}%` })}
              >
                <Label htmlFor={`${percent}%`}>{ message || `${percent}%` }</Label>
              </div>
            </div>
          )
          : (
            <div className="progress__circle">
              <svg className="progress__circle__svg" width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
                <circle className="progress-meter" cx={width / 2} cy={width / 2} r={radius} fill="none" stroke="#d3d3d3" strokeWidth={strokeSize} />
                <circle
                  className="progress-value"
                  cx={width / 2}
                  cy={width / 2}
                  r={radius}
                  fill="none"
                  stroke={fill}
                  strokeWidth={strokeSize}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (100 - percent) / 100}
                />
              </svg>
              <div className="progress__circle__message" style={{ padding: `${strokeSize}px` }}>
                <Label htmlFor={`${percent}%`}>{ message || `${percent}%` }</Label>
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
  message: string,
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
  message: '',
  type: 'bar',
  messageInside: false,
  strokeSize: 20,
  fill: '#87ceeb',
  width: 120,
};

export default Progress;
