import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Textarea from './Textarea';

it('should render the passed props as content body', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Textarea handleChange={handleChange} label="Textarea" />);
    expect(getByTestId('textarea-text').textContent).toBe('Textarea');
});

it('should be disabled when disabled prop is true', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Textarea handleChange={handleChange} disabled={true} />);
    expect(getByTestId('textarea')).toHaveAttribute('disabled');
});

it('should have placeholder text when placeholderText prop is passed', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Textarea handleChange={handleChange} placeholderText={'Sample placeholder'} />);
    expect(getByTestId('textarea')).toHaveAttribute('placeholder', 'Sample placeholder');
});

it('should have value property set when defaultValue prop is passed', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Textarea handleChange={handleChange} defaultValue='hello'/>);
    expect(getByTestId('textarea').textContent).toBe('hello');
});

it('should trim text on load id default value is more than character limit', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Textarea handleChange={handleChange} characterLimit={20} defaultValue='this text is more than 20 characters' />);
    expect(getByTestId('textarea').textContent).toBe('this text is more th');
});

it('handler function gets called with updated value when there is user input', () => {
    let val;
    const handleChange = (value) => {
        val = value;
    };
    const { getByTestId } = render(<Textarea handleChange={handleChange} />);
    const element = getByTestId('textarea');
    fireEvent.change(element, { target: { value: 'test value' } });
    expect(val).toBe('test value');
});

it('match regex and validate string when regEx and replaceString props are passed', () => {
    let val;
    const handleChange = (value) => {
        val = value;
    };
    const { getByTestId } = render(<Textarea handleChange={handleChange} regEx={['[0-9]', 'g']} replaceString={'*'} />);
    const element = getByTestId('textarea');
    fireEvent.change(element, { target: { value: 'replace number 0123 with replaceString' } });
    expect(val).toBe('replace number **** with replaceString');
});

it('show proper remaining character count', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Textarea handleChange={handleChange} showRemainingCharacters={true} characterLimit={50} />);
    const element = getByTestId('textarea');
    fireEvent.change(element, { target: { value: '21 characters entered' } });
    expect(getByTestId('limit').textContent).toBe('29 characters left');
});

it('paste shouldn\'t be allowed if allowPaste prop is passed as false', () => {
    let val = '';
    const handleChange = (value) => {
        val = value;
    };
    const { getByTestId } = render(<Textarea handleChange={handleChange} allowPaste={false} />);
    const element = getByTestId('textarea');
    fireEvent.paste(element, { target: { value: 'trying to paste some value' } });
    expect(val).toBe('');
});

it('should have no-resize class present when allowResize prop is passed as false', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Textarea handleChange={handleChange} allowResize={false} />);
    expect(getByTestId('textarea')).toHaveAttribute('class', 'no-resize');
});