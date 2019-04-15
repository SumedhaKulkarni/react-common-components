import React from 'react';
import { render } from 'react-testing-library';
import Modal from './Modal';

const onClose = jest.fn();

const BasicModal = (props) => {
  return (
    <Modal {...props}>
      <Modal.Header onClose={onClose}>Header</Modal.Header>
      <Modal.Body>Modal Body</Modal.Body>
      <Modal.Footer>Footer</Modal.Footer>
    </Modal>
  );
};
const props = {
  show: false,
};
it('should render the Modal component with props', () => {
  render(<BasicModal {...props} />);
});


it('should open Modal', () => {
  const { getByTestId, rerender } = render(<BasicModal {...props} />);
  rerender(<BasicModal show />);
  expect(getByTestId('modal-content')).toHaveClass('fadein');
  expect(getByTestId('modal')).toHaveStyle('display: block');
});

it('should close Modal', () => {
  const { getByTestId, rerender } = render(<BasicModal {...props} />);
  rerender(<BasicModal show={false} />);
  expect(getByTestId('modal-content')).toHaveClass('fadeout');
  setTimeout(() => {
    expect(getByTestId('modal-content')).toHaveClass('fadeout').toBe(false);
    expect(getByTestId('modal')).toHaveStyle('display: none');
  }, 300);
});
