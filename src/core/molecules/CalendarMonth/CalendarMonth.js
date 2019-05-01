import React, { useEffect, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  subMonths,
} from 'date-fns';
import clsx from 'clsx';
import { instanceOf, string } from 'prop-types';
import './CalendarMonth.css';
import CalendarDay from '../../atoms/CalendarDay/CalendarDay';
import { getWeekDays, getMonthSkeleton } from '../../../utils/calendarutil';
import Button from '../../atoms/Button/Button';

function CalendarMonth({ date, classname, ...props }) {
  const [startDate, setStartDate] = useState(date);
  useEffect(() => {
    setStartDate(date);
  }, [date]);

  function showPreviousMonth() {
    setStartDate(prevDate => subMonths(prevDate, 1));
  }

  function showNextMonth() {
    setStartDate(prevDate => addMonths(prevDate, 1));
  }

  const dayOfWeek = format(startOfMonth(startDate), 'd');
  const endDateOfMonth = format(endOfMonth(startDate), 'D');
  const totalDaysInView = dayOfWeek + endDateOfMonth > 35 ? 42 : 35;
  const prevMonthDays = -1 * dayOfWeek;
  const currentandnextMonthDays = totalDaysInView - dayOfWeek;
  const monthSkeletion = getMonthSkeleton(prevMonthDays, currentandnextMonthDays);
  const calendarMonth = monthSkeletion.map(d => addDays(startOfMonth(startDate), d));

  return (
    <div className={clsx('calendar-month-wrapper', classname)}>
      <div className="calendar-header">
        <div className="month-year">
          {format(startDate, 'MMM YYYY')}
        </div>
        <div className="navigate-months">
          <Button handleClick={showPreviousMonth}>Prev</Button>
          <Button handleClick={showNextMonth}>Next</Button>
        </div>
      </div>
      <div className="week-wrapper">
        {getWeekDays().map(day => (
          <div className="weekday" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="day-wrapper">
        {calendarMonth.map(d => <CalendarDay key={format(d, 'DDD')} activeMonth={startDate} day={d} {...props} />)}
      </div>
    </div>
  );
}

CalendarMonth.propTypes = {
  date: instanceOf(Date),
  classname: string,
};

CalendarMonth.defaultProps = {
  date: new Date(),
  classname: '',
};

export default CalendarMonth;
