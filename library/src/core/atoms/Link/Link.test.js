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

it('should accept size and appearance attributes', () => {
  const { container } = render(
    <LinkComp isInternal={false} size="medium" appearance="primary">
    Primary
    </LinkComp>,
  );
  expect(container.firstChild).toHaveClass('primary');
  expect(container.firstChild).toHaveClass('medium');
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
