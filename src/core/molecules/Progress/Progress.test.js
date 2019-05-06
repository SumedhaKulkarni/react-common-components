import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import Progress from './Progress';

it('should render the passed style props for progress bar', () => {
  const { getByTestId } = render(<Progress percent={20} fill="#f26a21" />);
  expect(getByTestId('progress-bar-line-fill')).toHaveStyle(`width: 20%, background-color: #f26a21, border: solid 1px #f26a21`);
  expect(getByTestId('progress-message').textContent).toBe('20%');
});

it('should render the passed message for progress bar', () => {
  const { getByTestId } = render(<Progress percent={20}>Loading...</Progress>);
  expect(getByTestId('progress-message').textContent).toBe('Loading...');
});

it('should render the messageInside progress bar', () => {
  let percent = 20
  const { getByTestId } = render(<Progress percent={percent} messageInside />);
  expect(getByTestId('progress-message')).toHaveClass('progress__bar__message--inline');
  expect(getByTestId('progress-message')).toHaveStyle(`right: 80%`);
});

it('should render the messageInside progress bar for 0%', () => {
  const { getByTestId } = render(<Progress percent={0} messageInside />);
  expect(getByTestId('progress-message')).toHaveClass('progress__bar__message--inline');
  expect(getByTestId('progress-message')).toHaveStyle(`left: 0`);
});

it('should render the passed style props for progress circle', () => {
  const { getByTestId } = render(<Progress percent={60} type="circle" strokeSize={12}>Loading...</Progress>);
  expect(getByTestId('progress-circle-fill')).toHaveAttribute('r', '54');  // radius
  expect(getByTestId('progress-circle-fill')).toHaveAttribute('stroke-width', '12');
  expect(getByTestId('progress-circle-fill')).toHaveAttribute('stroke-dasharray', '339.29200658769764')  // circumference
  expect(getByTestId('progress-circle-fill')).toHaveAttribute('stroke-dashoffset', '135.71680263507906')  // fill arc
  expect(getByTestId('progress-message').textContent).toBe('Loading...');
});
