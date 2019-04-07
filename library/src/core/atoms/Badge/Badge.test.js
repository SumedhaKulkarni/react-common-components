import React from 'react';
import { render } from 'react-testing-library';
import Badge from './Badge';

const BasicBadge = (props) => {
  return (
    <Badge {...props} />
  );
};
const props = {
  classname: 'my-badge',
  effect: 'bounce',
  shape: 'circle',
  count: '99+',
};

it('should render the badge component with props', () => {
  render(<BasicBadge {...props} />);
});

it('should add bounce class for bounce effect', () => {
  const { getByText } = render(<BasicBadge {...props} />);
  expect(getByText('99+')).toHaveClass('bounce');
});

it('should remove bounce class after bounce effect', () => {
  const { getByText } = render(<BasicBadge {...props} />);
  setTimeout(() => {
    expect(getByText('99+').toHaveClass('bounce')).toBe(false);
  }, 600);
});

it('should add class circle for circular shape', () => {
  const { getByText } = render(<BasicBadge {...props} />);
  expect(getByText('99+')).toHaveClass('circle');
});

it('should update the count value', () => {
  const { getByText, rerender } = render(<BasicBadge {...props} />);
  rerender(<BasicBadge count={100} />);
  expect(getByText('100').textContent).toBe('100');
});
