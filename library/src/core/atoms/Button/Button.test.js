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

it('should disable the button', () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(<Button handleClick={handleClick} disabled={true}>Primary</Button>);
  expect(getByTestId('button')).toHaveAttribute('disabled');
});

it('should accept size and appearance attributes', () => {
  const handleClick = jest.fn();
  const { container } = render(<Button handleClick={handleClick} size="medium" appearance="primary">Primary</Button>);
  expect(container.firstChild).toHaveClass('primary');
  expect(container.firstChild).toHaveClass('medium');
});
