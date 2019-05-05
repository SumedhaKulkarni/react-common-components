import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Toast from './Toast';

const onCloseToast = jest.fn();

const BasicToast = ({isOpen}) => {
  return (
    <Toast showToast={isOpen} onCloseToast={onCloseToast} closeButton={true}>
        <p>Hello there!!!</p>
    </Toast>
  );
};

afterEach(cleanup);

it('should render the Toast component with props', () => {
  render(<BasicToast />);
});


it('should toggle visibility of toast based on props', () => {
  const { getByTestId, rerender } = render(<BasicToast isOpen={true} />);
  expect(getByTestId('Toastify__toast')).toBeTruthy();
});

it('Should render closeButton if closeButton prop is set to true', () => {
    const { getByTestId } = render(<BasicToast isOpen={true} closeButton={true} />);
    expect(getByTestId('Toastify__action')).toBeTruthy();
  });

it('should close the toast on click on cross icon', () => {
  const { getByTestId } = render(<BasicToast isOpen={true} />);
  const icon = getByTestId('Toastify__action').querySelector('button');
  fireEvent.click(icon);
  setTimeout(() => {
    expect(getByTestId('Toastify__toast')).toBeFalsy();
  },800);
});

it('should call onClose callback when component will unmount', () => {
    const component = render(<BasicToast isOpen={true} />);
    component.unmount()
    expect(onCloseToast).toHaveBeenCalled();
  });