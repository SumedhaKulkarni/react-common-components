import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import Textbox from './Textbox';

it('should render the passed props as initial value', () => {
  const { getByTestId } = render(<Textbox value="hello"></Textbox>);
  expect(getByTestId('textbox').value).toBe("hello");
});

it('should invoke the click handler', () => {
  const handleChange = jest.fn();
  const { getByTestId } = render(<Textbox handleChange={handleChange}>Primary</Textbox>);
  fireEvent.change(getByTestId('textbox'), {target: {value: 'a'}});
  expect(handleChange).toHaveBeenCalledTimes(1);
});

it('should clear the value in textbox', () => {
  const { getByTestId } = render(<Textbox value="hello" canClear={true}></Textbox>);
  fireEvent.click(getByTestId('clear-textbox'))
  expect(getByTestId('textbox').textContent).toBe('');
});

it('should disable the textbox', () => {
  const { getByTestId } = render(<Textbox value="hello" readOnly={true} canClear={true}></Textbox>);
  expect(getByTestId('textbox')).toHaveAttribute('readonly');
});

it('should set placeholder for the textbox', () => {
  const { getByTestId } = render(<Textbox value="hello" placeHolder="Username" canClear={true}></Textbox>);
  expect(getByTestId('textbox')).toHaveAttribute('placeholder', 'Username');
});

it('should show clear icon when text input length is greater than 0', async () => {
  const { getByTestId } = render(<Textbox value="hello" placeHolder="Username"></Textbox>);
  fireEvent.change(getByTestId('textbox'), {target: {value: 'a'}});
  // wait for appearance
  await wait(() => {
    expect(getByTestId('clear-textbox')).toBeInTheDocument()
  })
});
