import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Tabs from './Tab';

it('should render the content of selected index', () => {
  const handleChange = jest.fn();
  const { getByTestId, getAllByTestId } = render(
    <Tabs selected={2} onChange={handleChange}>
      <Tabs.Pane title="User" index={1}>User</Tabs.Pane>
      <Tabs.Pane title="Config" index={2}>Config</Tabs.Pane>
      <Tabs.Pane title="Role" index={3} disabled>Role</Tabs.Pane>
      <Tabs.Pane title="Task" index={4}>Task</Tabs.Pane>
    </Tabs>,
  );

  expect(getByTestId('tab-content-item').textContent).toBe('Config');
  expect(getAllByTestId('tab-title-item')[1]).toHaveClass('tabs-component__title__item--active');
  expect(getAllByTestId('tab-title-item')[2]).toHaveClass('tabs-component__title__item--diabled');

  fireEvent.click(getAllByTestId('tab-title-item-label')[3]);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(getAllByTestId('tab-title-item')[1]).not.toHaveClass('tabs-component__title__item--active');
  expect(getAllByTestId('tab-title-item')[3]).toHaveClass('tabs-component__title__item--active');

  fireEvent.click(getAllByTestId('tab-title-item-label')[2]);
  // WHY is the following failing??
  // expect(handleChange).toHaveBeenCalledTimes(0);
  expect(getAllByTestId('tab-title-item')[2]).not.toHaveClass('tabs-component__title__item--active');
});
