import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Button from './Button';

it('should render the passed props as content body', () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(<Button handleClick={handleClick}>Primary</Button>);
  expect(getByTestId('button').textContent).toBe('Primary');
});

it('should invoke the click handler', () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(<Button handleClick={handleClick}>Primary</Button>);
  fireEvent.click(getByTestId('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
  
});
