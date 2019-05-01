import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { instanceOf } from 'prop-types';
import clsx from 'clsx';
import './CalendarDay.css';

function CalendarDay({ activeMonth, day, ...props }) {
  const isInCurrentMonth = isSameMonth(day, activeMonth);
  const isCurrentDay = isToday(day);
  return (
    <div
      className={
        clsx('calenday-day',
          { 'current-month': isInCurrentMonth },
          { 'current-day': isCurrentDay })
      }
      {...props}
    >
      {format(day, 'D')}
    </div>
  );
}

CalendarDay.propTypes = {
  day: instanceOf(Date),
  activeMonth: instanceOf(Date),
};

CalendarDay.defaultProps = {
  day: new Date(),
  activeMonth: new Date(),
};

export default CalendarDay;
