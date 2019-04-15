import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Modal from './core/atoms/Modal/Modal';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  function onCloseModal() {
    setIsOpen(false);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to React</h2>
      </header>
      <main>
        <div>
          <button type="button" tabIndex={-1} onClick={showModal}>Open the modal</button>
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
        </div>
      </main>
    </div>
  );
};

export default App;
