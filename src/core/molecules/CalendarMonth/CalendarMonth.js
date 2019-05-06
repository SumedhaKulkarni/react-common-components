import React, { useEffect, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  subMonths,
  isEqual,
} from 'date-fns';
import clsx from 'clsx';
import {
  instanceOf, string, bool, shape, func, arrayOf, number,
} from 'prop-types';
import './CalendarMonth.css';
import CalendarDay from '../../atoms/CalendarDay/CalendarDay';
import { getWeekDays, getMonthSkeleton } from '../../../utils/calendarutil';
import Button from '../../atoms/Button/Button';

function CalendarMonth({
  activeMonth,
  classname,
  disableNext,
  disablePrev,
  monthData,
  nextBtnClicked,
  prevtBtnClicked,
  maxCount,
  onDayObjectSelected,
  ...props
}) {
  const [currentMonth, setCurrentMonth] = useState(activeMonth);
  const [monthInfoObj, setMonthInfoObj] = useState(monthData);
  const [allowNext, setNext] = useState(disableNext);
  const [allowPrev, setPrev] = useState(disablePrev);
  useEffect(() => {
    setCurrentMonth(activeMonth);
  }, [activeMonth]);

  useEffect(() => {
    setMonthInfoObj(monthData);
  }, [monthData]);

  useEffect(() => {
    setNext(disableNext);
  }, [disableNext]);

  useEffect(() => {
    setPrev(disablePrev);
  }, [disablePrev]);

  function showPreviousMonth() {
    setCurrentMonth(prevDate => subMonths(prevDate, 1));
    prevtBtnClicked();
  }

  function showNextMonth() {
    setCurrentMonth(prevDate => addMonths(prevDate, 1));
    nextBtnClicked();
  }

  const dayOfWeek = format(startOfMonth(currentMonth), 'd');
  const endDateOfMonth = format(endOfMonth(currentMonth), 'D');
  const totalDaysInView = dayOfWeek + endDateOfMonth > 35 ? 42 : 35;
  const prevMonthDays = -1 * dayOfWeek;
  const currentandnextMonthDays = totalDaysInView - dayOfWeek;
  const monthSkeletion = getMonthSkeleton(prevMonthDays, currentandnextMonthDays);
  const calendarMonth = monthSkeletion.map(d => addDays(startOfMonth(currentMonth), d));
  const monthWithDataMapping = calendarMonth.map((day) => {
    const dayObject = {
      day,
      dayInfo: [],
    };

    // check if the month object passed from parent has data
    // corresponding to dates in the month
    monthInfoObj.map((d) => {
      if (isEqual(format(d.date, 'MM/DD/YYYY'), format(day, 'MM/DD/YYYY'))) {
        dayObject.dayInfo.push(d.list);
      }
      return d;
    });
    return dayObject;
  });


  return (
    <div className={clsx('calendar-month-wrapper', classname)} data-testid="calendar-month">
      <div className="calendar-header">
        <div className="month-year">
          {format(currentMonth, 'MMM YYYY')}
        </div>
        <div className="navigate-months">
          <Button classname="prev-month" handleClick={showPreviousMonth} disabled={allowPrev}>Prev</Button>
          <Button classname="next-month" handleClick={showNextMonth} disabled={allowNext}>Next</Button>
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
        {monthWithDataMapping.map(d => (
          <CalendarDay
            key={format(d.day, 'DDD')}
            activeMonth={currentMonth}
            dayObject={d}
            onSelected={onDayObjectSelected}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}

CalendarMonth.propTypes = {
  activeMonth: instanceOf(Date),
  classname: string,
  disableNext: bool,
  disablePrev: bool,
  monthData: arrayOf(shape({ date: instanceOf(Date), list: [] })).isRequired,
  nextBtnClicked: func,
  prevtBtnClicked: func,
  maxCount: number,
  onDayObjectSelected: func,
};

CalendarMonth.defaultProps = {
  activeMonth: new Date(),
  classname: '',
  disableNext: false,
  disablePrev: false,
  maxCount: 3,
  nextBtnClicked: () => {},
  prevtBtnClicked: () => {},
  onDayObjectSelected: () => {},
};

export default CalendarMonth;
