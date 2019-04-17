import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Checkbox from './Checkbox';

it('should render the passed props as content body', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Checkbox handleChange={handleChange} displayText="Check" />);
    expect(getByTestId('checkbox-text').textContent).toBe('Check');
});

it('should invoke the click handler on click of checkbox', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Checkbox handleChange={handleChange} displayText="Check" />);
    fireEvent.click(getByTestId('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
});

it('should invoke the click handler on click of checkbox label', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Checkbox handleChange={handleChange} displayText="Check" />);
    fireEvent.click(getByTestId('checkbox-text'));
    expect(handleChange).toHaveBeenCalledTimes(1);
});

it('should disable the checkbox', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Checkbox handleChange={handleChange} disabled={true} displayText="Check" />);
    expect(getByTestId('checkbox')).toHaveAttribute('disabled');
});

it('Checked attribute should change on click of checkbox', () => {
    let checkedState = false;
    const changeHandler = jest.fn((checked, val) => checkedState = checked);
    const { getByTestId } = render(<Checkbox handleChange={changeHandler} disabled={true} displayText="Check" />);
    fireEvent.click(getByTestId('checkbox'));
    expect(checkedState).toBe(true);
    fireEvent.click(getByTestId('checkbox'));
    expect(checkedState).toBe(false);
});

