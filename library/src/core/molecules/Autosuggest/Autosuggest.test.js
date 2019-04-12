/* eslint-disable */
import React from 'react';
import {
  render,
  fireEvent,
} from 'react-testing-library';
import { Autosuggest } from './Autosuggest';

const listItems = [
  {
    id: 1,
    title: 'list item 11',
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

const CommonComponent = ({ listItemClicked, ...props }) => (
  <Autosuggest {...props} textChange={() => {}}>
    <ul data-testid="combo-list-box">
      {listItems.map(item => (
        <li key={item.id} onClick={() => listItemClicked(item.title)}>
          {item.title}
        </li>
      ))}
    </ul>
  </Autosuggest>
);

it('should render all list items', () => {
  const { getByTestId } = render(<CommonComponent showListContainer />);
  expect(getByTestId('combo-list-box').childElementCount).toBe(4);
});

it('should display pre selected list item', () => {
  render(<CommonComponent selectedValue="list item 1" />);
  expect(document.querySelector('.textbox-component input').getAttribute('value')).toBe('list item 1');
});

it('should set the clicked list item value to the textbox', () => {
  const listItemClicked = jest.fn();
  const { getByTestId } = render(<CommonComponent showListContainer listItemClicked={listItemClicked} />);
  const listItem = getByTestId('combo-list-box').firstChild;
  fireEvent.click(listItem);
  expect(listItemClicked).toHaveBeenCalledTimes(1);
  expect(listItem.textContent).toBe('list item 11');
});

it('should hide the list item container', () => {
  render(<CommonComponent />)
  expect(document.querySelector('.autosuggest-list-container').childElementCount).toBe(0);
})
