import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import QuestionNodeForm from '@components/ScriptBuilder/Forms/QuestionNodeForm';

describe('QuestionNodeForm', () => {
  const mockData = {
    question: 'What is your name?',
    choices: [
      { label: 'John', value: 'john' },
      { label: 'Jane', value: 'jane' }
    ]
  };

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the provided question and choices', () => {
    render(<QuestionNodeForm data={mockData} onChange={mockOnChange} />);

    const questionInput = screen.getByLabelText('Question') as HTMLInputElement;
    expect(questionInput).toBeInTheDocument();
    expect(questionInput.value).toBe('What is your name?');

    const choices = screen.getAllByRole('textbox');
    expect(choices.length).toBe(5); // Question input + 2 pairs of choice inputs

    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane')).toBeInTheDocument();
  });

  it('calls onChange when question is updated', () => {
    render(<QuestionNodeForm data={mockData} onChange={mockOnChange} />);

    const questionInput = screen.getByLabelText('Question');
    fireEvent.change(questionInput, { target: { value: 'How old are you?' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      question: 'How old are you?',
      choices: mockData.choices
    });
  });

  it('calls onChange when a choice label is updated', () => {
    render(<QuestionNodeForm data={mockData} onChange={mockOnChange} />);

    const choiceLabels = screen.getAllByPlaceholderText('Choice label');
    fireEvent.change(choiceLabels[0], { target: { value: 'Johnny' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      question: mockData.question,
      choices: [
        { label: 'Johnny', value: 'john' },
        { label: 'Jane', value: 'jane' }
      ]
    });
  });

  it('calls onChange when a choice value is updated', () => {
    render(<QuestionNodeForm data={mockData} onChange={mockOnChange} />);

    const choiceValues = screen.getAllByPlaceholderText('Choice value');
    fireEvent.change(choiceValues[1], { target: { value: 'janet' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      question: mockData.question,
      choices: [
        { label: 'John', value: 'john' },
        { label: 'Jane', value: 'janet' }
      ]
    });
  });

  it('allows adding a new choice', () => {
    render(<QuestionNodeForm data={mockData} onChange={mockOnChange} />);

    const addButton = screen.getByText('Add Choice');
    fireEvent.click(addButton);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      question: mockData.question,
      choices: [...mockData.choices, { label: '', value: '' }]
    });
  });

  it('allows removing a choice', () => {
    render(<QuestionNodeForm data={mockData} onChange={mockOnChange} />);

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith({
      question: mockData.question,
      choices: [{ label: 'Jane', value: 'jane' }]
    });
  });

  it('disables remove button when only one choice remains', () => {
    render(
      <QuestionNodeForm
        data={{ question: 'Test?', choices: [{ label: 'One', value: 'one' }] }}
        onChange={mockOnChange}
      />
    );

    const removeButton = screen.getByText('Remove');
    expect(removeButton).toBeDisabled();
  });
});
