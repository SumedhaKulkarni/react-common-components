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

it('should render the accordion component with props', () => {
  render(<BasicBadge {...props} />);
});

it('should add class bounce for bounce effect', () => {
  const { getByText } = render(<BasicBadge {...props} />);
  expect(getByText('99+')).toHaveClass('bounce');
});

it('should add class circle for circular shape', () => {
  const { getByText } = render(<BasicBadge {...props} />);
  expect(getByText('99+')).toHaveClass('circle');
});
