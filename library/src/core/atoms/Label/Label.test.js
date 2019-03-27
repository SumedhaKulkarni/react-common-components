/* eslint-disable */
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Label from './Label';

it('should render the passed props as content body', () => {
  const { getByTestId } = render(<Label htmlFor='username'>Primary</Label>);
  expect(getByTestId('label').textContent).toBe('Primary');
});

