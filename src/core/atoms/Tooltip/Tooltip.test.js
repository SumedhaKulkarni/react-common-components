import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Tooltip from './Tooltip';

it('By default tooltip shouldn\'t be shown', () => {
    const { queryByTestId } = render(<Tooltip displayOnClick={false} text={'Sample tooltip'}>tooltip</Tooltip>);
    expect(queryByTestId('tooltip-bubble')).toBeNull();
});

it('Tooltip will be shown on click once displayOnClick prop is passed as true', () => {
    const { getByTestId } = render(<Tooltip displayOnClick={true} text={'Sample tooltip'}>tooltip</Tooltip>);
    fireEvent.click(getByTestId('tooltip-trigger'));
    expect(getByTestId('tooltip-bubble').textContent).toBe('Sample tooltip');
});

it('Tooltip will be hidden once clicked on outside tooltip element', () => {
    const { getByTestId, queryByTestId } = render(<Tooltip displayOnClick={true} text={'Sample tooltip'}>tooltip</Tooltip>);
    fireEvent.click(getByTestId('tooltip-trigger'));
    fireEvent.click(document);
    expect(queryByTestId('tooltip-bubble')).toBeNull();
});

it('Tooltip will be shown on click once mouse enters tooltip element', () => {
    const { getByTestId } = render(<Tooltip displayOnClick={false} text={'Sample tooltip'}>tooltip</Tooltip>);
    fireEvent.mouseEnter(getByTestId('tooltip-trigger'));
    expect(getByTestId('tooltip-bubble').textContent).toBe('Sample tooltip');
});

it('Tooltip will be hidden once mouse leaves tooltip element', () => {
    const { getByTestId, queryByTestId } = render(<Tooltip displayOnClick={false} text={'Sample tooltip'}>tooltip</Tooltip>);
    fireEvent.mouseEnter(getByTestId('tooltip-trigger'));
    fireEvent.mouseLeave(getByTestId('tooltip-trigger'));
    expect(queryByTestId('tooltip-bubble')).toBeNull()
});