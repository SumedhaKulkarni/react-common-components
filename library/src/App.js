import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Autosuggest, useListSelection, useVisibility } from './core/molecules/Autosuggest/Autosuggest';
import useFilterList from './core/common-hooks/useFilterList';

const listItems = [
  {
    id: 1,
    title: 'list item 1',
  },
  {
    id: 2,
    title: 'list item 2',
  },
  {
    id: 3,
    title: 'list item 3',
  },
  {
    id: 4,
    title: 'list item 4',
  },
];

const App = () => {
  const [selectedItem, setSelectedListItem] = useListSelection();
  const [listCollection, setListCollection] = useFilterList(listItems);
  const [showListWrapper, setListWrapper] = useVisibility();

  function onTextChange(searchText) {
    const textLength = searchText.length;
    if (textLength > 0) {
      setListCollection(searchText);
      setListWrapper(true);
    } else {
      setListWrapper(false);
    }
  }

  function setListItem(title) {
    setSelectedListItem(title);
    setListWrapper(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to React</h2>
      </header>
      <main>
        <Autosuggest
          selectedValue={selectedItem}
          textChange={onTextChange}
          showListContainer={showListWrapper}
        >
          <ul>
            {listCollection.map(item => (
              <li key={item.id} onClick={() => setListItem(item.title)}> {/*eslint-disable-line*/}
                {item.title}
              </li>
            ))}
          </ul>
        </Autosuggest>
      </main>
    </div>
  );
};

export default App;
