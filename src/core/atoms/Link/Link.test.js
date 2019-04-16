import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import LinkComp from './Link';

it('should render the passed props as content body', () => {
  const { getByTestId } = render(
    <LinkComp isInternal={false}>
    Primary
    </LinkComp>,
  );
  expect(getByTestId('link').textContent).toBe('Primary');
});

it('should accept target attribute', () => {
  const { getByTestId } = render(
    <LinkComp isInternal={false} target="_blank">
    Primary
    </LinkComp>,
  );
  expect(getByTestId('link')).toHaveAttribute('target');
});

it('should switch to internal link', () => {
  const clickEvent = jest.fn();
  const { getByTestId } = render(
    <LinkComp isInternal clickEvent={clickEvent}>
    Primary
    </LinkComp>,
  );
  fireEvent.click(getByTestId('button'));
  expect(clickEvent).toHaveBeenCalledTimes(1);
});

it('should switch to external link', () => {
  const { getByTestId } = render(
    <LinkComp isInternal={false} address="#top">
    Primary
    </LinkComp>,
  );
  expect(getByTestId('link')).toHaveAttribute('href');
});
