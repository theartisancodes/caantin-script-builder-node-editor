import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GreetingNodeForm from '@components/ScriptBuilder/Forms/GreetingsNodeForm';

describe('GreetingNodeForm', () => {
  const mockData = {
    message: 'Hello world'
  };

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the provided message', () => {
    render(<GreetingNodeForm data={mockData} onChange={mockOnChange} />);

    const textArea = screen.getByLabelText(
      'Greeting Message'
    ) as HTMLTextAreaElement;
    expect(textArea).toBeInTheDocument();
    expect(textArea.value).toBe('Hello world');
  });

  it('calls onChange when message is updated', () => {
    render(<GreetingNodeForm data={mockData} onChange={mockOnChange} />);

    const textArea = screen.getByLabelText('Greeting Message');

    fireEvent.change(textArea, { target: { value: 'New greeting' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({ message: 'New greeting' });
  });

  it('shows placeholder text when textarea is empty', () => {
    render(<GreetingNodeForm data={{ message: '' }} onChange={mockOnChange} />);

    const textArea = screen.getByPlaceholderText(
      'Enter your greeting message...'
    );
    expect(textArea).toBeInTheDocument();
  });

  it('marks the textarea as required', () => {
    render(<GreetingNodeForm data={mockData} onChange={mockOnChange} />);

    const textArea = screen.getByLabelText('Greeting Message');
    expect(textArea).toHaveAttribute('required');
  });
});
