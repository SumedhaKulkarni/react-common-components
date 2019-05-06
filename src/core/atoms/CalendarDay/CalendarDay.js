import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import {
  instanceOf, number, shape, string, func,
} from 'prop-types';
import clsx from 'clsx';
import './CalendarDay.css';
import Button from '../Button/Button';

function CalendarDay({
  activeMonth,
  dayObject,
  maxCount,
  onSelected,
  ...props
}) {
  const { day, dayInfo } = dayObject;
  const isInCurrentMonth = isSameMonth(day, activeMonth);
  const isCurrentDay = isToday(day);
  let excededCount = 0;
  function getNElements() {
    excededCount = dayInfo[0].length - maxCount;
    return dayInfo[0].slice(0, maxCount);
  }

  function handleBtnClick(info = undefined) {
    onSelected(day, info);
  }

  const dayObjectToDisplay = (dayInfo[0] && dayInfo[0].length > maxCount)
    ? getNElements() : dayInfo[0];
  return (
    <div
      className={
        clsx('calenday-day',
          { 'current-month': isInCurrentMonth },
          { 'current-day': isCurrentDay })
      }
      {...props}
      role="button"
    >
      {format(day, 'D')}
      <div className="day-items">
        {dayObjectToDisplay && dayObjectToDisplay.map(d => (
          <Button handleClick={() => handleBtnClick(d)} key={d.id}>{d.title}</Button>
        ))}
        {excededCount > 0 && <Button handleClick={handleBtnClick} classname="additional-listitems">+ {excededCount} more </Button>}
      </div>
    </div>
  );
}

CalendarDay.propTypes = {
  dayObject: shape({ day: instanceOf(Date), dayInfo: [{ id: string, title: string }] }).isRequired,
  activeMonth: instanceOf(Date),
  maxCount: number,
  onSelected: func,
};

CalendarDay.defaultProps = {
  activeMonth: new Date(),
  maxCount: 3,
  onSelected: () => {},
};

export default CalendarDay;
