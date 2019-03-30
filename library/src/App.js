import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Accordion from './core/atoms/Accordion/Accordion';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h2>
      Welcome to React
      </h2>
    </header>
    <main>
      <Accordion>
        <Accordion.Title index={1}>
              This is title1
        </Accordion.Title>
        <Accordion.Content index={1}>
          This is content of the accordion1
        </Accordion.Content>

        <Accordion.Title index={2}>
          This is title2
        </Accordion.Title>
        <Accordion.Content index={2}>
          This is content of the accordion2
        </Accordion.Content>

        <Accordion.Title index={3}>
          This is title3
        </Accordion.Title>
        <Accordion.Content index={3}>
        This is content of the accordion3
        </Accordion.Content>
      </Accordion>
    </main>
  </div>
);


export default App;
