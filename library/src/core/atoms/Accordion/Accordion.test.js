import React from 'react';
import { render, fireEvent, act } from 'react-testing-library';
import Accordion from './Accordion';

const CommonAccordion = (props) => {
  return (
    <Accordion {...props}>
      <Accordion.Title index={1}>One</Accordion.Title>
      <Accordion.Content index={1}>First Panel</Accordion.Content>
      <Accordion.Title index={2}>Two</Accordion.Title>
      <Accordion.Content index={2}>Second Panel</Accordion.Content>
    </Accordion>
  );
}
const props = {
  openMutilpePanes: false,
  preSelectedPanes: [1]
}
it('should render the accordion component with props', () => {
  render(<CommonAccordion {...props} />);
});

it('toggle the accordion panel ', () => {
  const { getByText } = render(<CommonAccordion />);
  const title = getByText('One');
  fireEvent.click(title);
  const section = getByText('First Panel');
  expect(section).toHaveClass('show');

  fireEvent.click(title);
  expect(section).toHaveClass('hide');
});

it('expand panel on load', () => {
  const { getByText } = render(<CommonAccordion preSelectedPanes={[1]}/>);
  const title = getByText('One');
  expect(title.parentElement).toHaveAttribute('aria-expanded', "true");
});

it('should allow multiple panels to be expanded simulatneously', () => {
  const { container, getByText } =  render(<CommonAccordion openMutilpePanes />);
  const first = getByText('One');
  fireEvent.click(first);
  const second = getByText('Two');
  fireEvent.click(second);

  expect(container.getElementsByClassName('expanded').length).toBe(2);
});
