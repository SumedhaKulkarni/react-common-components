import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Switch from './Switch';

it('should handle the change function', () => {
  const handleToggle = jest.fn();
  const { getByTestId } = render(
    <Switch handleToggle={handleToggle} />,
  );
  fireEvent.click(getByTestId('input-switch'));
  expect(handleToggle).toHaveBeenCalledTimes(1);
});

it('should accept on and off text', () => {
  const handleToggle = jest.fn();
  const { getByTestId } = render(
    <Switch handleToggle={handleToggle} onText="Yes" offText="No" />,
  );
  expect(getByTestId('input-on').textContent).toBe('Yes');
  expect(getByTestId('input-off').textContent).toBe('No');
});

it('should disable the switch', () => {
  const handleToggle = jest.fn();
  const { getByTestId } = render(
    <Switch handleToggle={handleToggle} disabled />,
  );
  expect(getByTestId('input-switch')).toHaveAttribute('disabled');
});

it('should be checked when loaded', () => {
  const handleToggle = jest.fn();
  const { getByTestId } = render(
    <Switch handleToggle={handleToggle} checked />,
  );
  expect(getByTestId('input-switch')).toHaveAttribute('checked');
});
