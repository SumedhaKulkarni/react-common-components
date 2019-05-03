import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Dropdown from './Dropdown';

it('should handle the change function', () => {
  const options = ["Apple", "Orange", "Grape"];
  const handleToggle = jest.fn();
  const { getByTestId } = render(
    <Dropdown clickHandler={handleToggle} options={options} />,
  );
  fireEvent.change(getByTestId('dropdown'));
  expect(handleToggle).toHaveBeenCalledTimes(1);
});

it('should disable the dropdown', () => {
  const options = ["Apple", "Orange", "Grape"];
  const { getByTestId } = render(
    <Dropdown options={options} disabled />,
  );
  expect(getByTestId('dropdown')).toHaveAttribute('disabled');
});

it('should accept size attribute', () => {
  const options = ["Apple", "Orange", "Grape"];
  const { container } = render(
    <Dropdown options={options} size="medium" />,
  );
  expect(container.firstChild).toHaveClass('medium');
});

it('should accept required attribute', () => {
  const options = ["Apple", "Orange", "Grape"];
  const { getByTestId } = render(
    <Dropdown options={options} required />,
  );
  expect(getByTestId('dropdown')).toHaveAttribute('required');
});
