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
  count: '99+'
};

it('should render the accordion component with props', () => {
  render(<BasicBadge {...props} />);
});
