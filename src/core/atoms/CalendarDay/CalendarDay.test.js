import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import CalendarDay from './CalendarDay';

const dayObject = {
  day: new Date(),
  dayInfo: [],
}

const dayObjectWithData = {
  day: new Date(),
  dayInfo: [[{
    "id": 3,
    "title": "conference"
  }, {
    "id": 4,
    "title": "some event"
  }]],
}

it('should render today with respective class', () => {
  const { getByTestId } = render(<CalendarDay  dayObject={dayObject} />);
  expect(getByTestId('calendar-day').classList).toContain('current-day');
  expect(getByTestId('calendar-day').classList).toContain('current-month');
});

it('should render day with two list of items', () => {
  render(<CalendarDay dayObject={dayObjectWithData} />);
  expect(document.querySelector('.day-items').childElementCount).toBe(2);
});

it('should pass the data of selected object to parent via callback', () => {
  const onDayObjectSelected = jest.fn();
  const { getByText } = render(<CalendarDay dayObject={dayObjectWithData} onSelected={onDayObjectSelected} />);
  const listObj = getByText('conference');
  fireEvent.click(listObj);
  expect(onDayObjectSelected).toHaveBeenCalledTimes(1);
})