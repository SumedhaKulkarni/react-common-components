import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Modal from './Modal';

const onCloseModal = jest.fn();

const BasicModal = ({isOpen, onCloseModal}) => {
  return (
    <Modal showModal={isOpen} onClose={onCloseModal}>
        <div className="modal-header">
          <h2>Modal Header</h2>
        </div>
        <div className="modal-body">
          Modal Content
        </div>
        <div className="modal-footer">
          Modal Footer
        </div>
     </Modal>
  );
};

afterEach(cleanup);

it('should render the Modal component with props', () => {
  render(<BasicModal />);
});


it('should toggle visibility of modal based on props', () => {
  const { getByTestId, rerender } = render(<BasicModal isOpen={false} />);
  expect(getByTestId('modal-container')).not.toHaveClass('show');
  rerender(<BasicModal isOpen={true} />)
  expect(getByTestId('modal-container')).toHaveClass('show modal');
});

it('should close the modal on click on cross icon', () => {
  const { getByTestId } = render(<BasicModal isOpen={false} />);
  const icon = getByTestId('modal-container').querySelector('.close-icon');
  fireEvent.click(icon);
  expect(getByTestId('modal-container')).not.toHaveClass('show');
});

it('should close the modal on click on modal background layer', () => {
  const { getByTestId } = render(<BasicModal isOpen />);
  expect(getByTestId('modal-container')).toHaveClass('show modal');
  fireEvent.click(getByTestId('modal-container'));
  expect(getByTestId('modal-container')).not.toHaveClass('show');
});