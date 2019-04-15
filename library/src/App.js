import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Tabs from './core/atoms/Tab/Tab';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h2>Welcome to React</h2>
    </header>
    <main>
      <Tabs selected={1}>
        <Tabs.Pane title="User" index={1}>User</Tabs.Pane>
        <Tabs.Pane title="Config" index={2}>Config</Tabs.Pane>
        <Tabs.Pane title="Role" index={3} disabled>Role</Tabs.Pane>
        <Tabs.Pane title="Task" index={4}>Task</Tabs.Pane>
      </Tabs>
    </main>
  </div>
);

export default App;
