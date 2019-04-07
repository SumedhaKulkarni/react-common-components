import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import RadioOption from './RadioOption';

it('should render the passed props as input attributes', () => {
  const { getByTestId, container } = render(<RadioOption label="apples" value="Apples" name="fruits" checked disabled />);
  // to check the expected value
  expect(getByTestId('radio-option')).toHaveTextContent('Apples');

  // to check the disabled property
  expect(getByTestId('radio-option-input')).toHaveAttribute('disabled');
  expect(getByTestId('radio-option-input')).toBeDisabled();
  expect(container.firstChild).toHaveClass('radio-option--disabled');
  expect(getByTestId('radio-option-input')).toHaveClass('radio-option__input--disabled');

  // to check if the input property  is checked
  expect(getByTestId('radio-option-input')).toHaveAttribute('checked');
  expect(container.firstChild).toHaveClass('radio-option--selected');
  expect(getByTestId('radio-option-input')).toHaveClass('radio-option__input--selected');
});

it('should fire selection change event of radio button', () => {
  const handleChange = jest.fn();

  const { getByText } = render(
    <div>
      <RadioOption label="apples" value="Apples" name="fruits" onChange={handleChange} />
      <RadioOption label="oranges" value="Oranges" name="fruits" checked onChange={handleChange} />
    </div>,
  );
  const radioOptionOne = getByText('Apples');
  fireEvent.click(radioOptionOne);
  expect(handleChange).toHaveBeenCalledTimes(1);
});
