import React from 'react';
import { render, fireEvent } from 'react-testing-library'
import {
  format,
} from 'date-fns';;
import CalendarMonth from './CalendarMonth';

const data = [{
  "date": new Date(),
  "list": []
}]

it('should render current month', () => {
  render(<CalendarMonth monthData={data} />);
  const monthText = format(new Date(), 'MMM YYYY');
  expect(document.querySelector('.month-year').textContent).toBe(monthText);
});

it('should display all days of week', () => {
  render(<CalendarMonth monthData={data} />);
  expect(document.querySelector('.week-wrapper').childElementCount).toBe(7);
});

it('should render next month', () => {
  render(<CalendarMonth monthData={data} />);
  const btn = document.querySelector('.next-month button');
  fireEvent.click(btn);
  const currentDay = document.querySelector('.current-day');
  expect(currentDay).toBe(null);
});

it('should execute previous month button click event', () => {
  const showPreviousMonth = jest.fn();
  render(<CalendarMonth monthData={data} prevtBtnClicked={showPreviousMonth} />);
  const btn = document.querySelector('.prev-month button');
  fireEvent.click(btn);
  expect(showPreviousMonth).toHaveBeenCalledTimes(1);
});
