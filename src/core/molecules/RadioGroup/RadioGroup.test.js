import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import RadioGroup from './RadioGroup';
import RadioOption from '../../atoms/RadioOption/RadioOption';

it('should render the passed props as input attributes to all children', () => {
  const handleChange = jest.fn();
  const selectedValue = 'oranges';
  const { getByTestId, getAllByTestId } = render(
    <RadioGroup name="fruit" selectedValue={selectedValue} onChange={handleChange}>
      <RadioOption label="apples" value="apples">
          Apples
      </RadioOption>
      <RadioOption label="oranges" value="Oranges">
          Oranges
      </RadioOption>
      <RadioOption label="grapes" value="Grapes" disabled>
          Grapes
      </RadioOption>
    </RadioGroup>,
  );

  expect(getByTestId('radio-group')).toHaveClass('radio-group-component--vertical');

  const radioOptionInputs = getAllByTestId('radio-option-input');
  radioOptionInputs.forEach((element) => {
    expect(element).toHaveAttribute('name', 'fruit');

    if (element.value === selectedValue) {
      expect(element).toHaveAttribute('checked');
      expect(element).toHaveClass('radio-option__input--selected');
    }
    if (element.disabled) {
      expect(element).toHaveClass('radio-option__input--disabled');
    }
  });

  // change selection
  fireEvent.click(radioOptionInputs[0]);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(radioOptionInputs[0]).toHaveClass('radio-option__input--selected');
});

it('should render radio inputs horizontally', () => {
  const handleChange = jest.fn();
  const selectedValue = 'oranges';
  const { getByTestId } = render(
    <RadioGroup name="fruit" selectedValue={selectedValue} onChange={handleChange} horizontal>
      <RadioOption label="apples" value="apples">
          Apples
      </RadioOption>
      <RadioOption label="oranges" value="Oranges">
          Oranges
      </RadioOption>
      <RadioOption label="grapes" value="Grapes" disabled>
          Grapes
      </RadioOption>
    </RadioGroup>,
  );
  expect(getByTestId('radio-group')).toHaveClass('radio-group-component--horizontal');
});
