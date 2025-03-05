import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InformationNodeForm from '@/components/script-builder/forms/InformationNodeForm';

describe('InformationNodeForm', () => {
  const mockData = {
    message: 'This is an information message'
  };

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the provided message', () => {
    render(<InformationNodeForm data={mockData} onChange={mockOnChange} />);

    const textArea = screen.getByLabelText(
      'Information Message'
    ) as HTMLTextAreaElement;
    expect(textArea).toBeInTheDocument();
    expect(textArea.value).toBe('This is an information message');
  });

  it('calls onChange when message is updated', () => {
    render(<InformationNodeForm data={mockData} onChange={mockOnChange} />);

    const textArea = screen.getByLabelText('Information Message');

    fireEvent.change(textArea, { target: { value: 'New information' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({ message: 'New information' });
  });

  it('shows placeholder text when textarea is empty', () => {
    render(
      <InformationNodeForm data={{ message: '' }} onChange={mockOnChange} />
    );

    const textArea = screen.getByPlaceholderText(
      'Enter your information message...'
    );
    expect(textArea).toBeInTheDocument();
  });

  it('marks the textarea as required', () => {
    render(<InformationNodeForm data={mockData} onChange={mockOnChange} />);

    const textArea = screen.getByLabelText('Information Message');
    expect(textArea).toHaveAttribute('required');
  });
});
