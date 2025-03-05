import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NodeProperties from './index';

describe('NodeProperties', () => {
  it('renders with greeting node type', () => {
    const greetingNode = {
      id: 'node1',
      type: 'greeting',
      data: {
        message:
          "Hello, I'm calling from Caantin AI. Do you have a moment to discuss your business needs?"
      }
    };

    render(
      <NodeProperties selectedNode={greetingNode} onNodeChange={() => {}} />
    );

    // Use more specific selectors to avoid ambiguity
    expect(screen.getByRole('button', { name: /^greeting$/i })).toHaveClass(
      'bg-primary'
    );
    expect(screen.getByLabelText(/greeting message/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/Hello, I'm calling from Caantin AI/i)
    ).toBeInTheDocument();
  });

  it('renders with information node type', () => {
    const infoNode = {
      id: 'node2',
      type: 'information',
      data: {
        message: 'Important information about our services'
      }
    };

    render(<NodeProperties selectedNode={infoNode} onNodeChange={() => {}} />);

    // Click on the Information button to activate it
    fireEvent.click(screen.getByRole('button', { name: /^information$/i }));

    expect(screen.getByRole('button', { name: /^information$/i })).toHaveClass(
      'bg-primary'
    );
    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();
  });

  it('renders with question node type', () => {
    const questionNode = {
      id: 'node3',
      type: 'question',
      data: {
        question: 'Are you currently using any AI solutions in your business?',
        options: ['Yes', 'No', 'Not sure']
      }
    };

    render(
      <NodeProperties selectedNode={questionNode} onNodeChange={() => {}} />
    );

    const questionButton = screen.getByRole('button', { name: /^question$/i });
    fireEvent.click(questionButton);

    expect(questionButton).toHaveClass('bg-primary');

    const questionTextArea = screen.getByLabelText(/question text/i);
    expect(questionTextArea).toHaveValue(
      'Are you currently using any AI solutions in your business?'
    );

    const option1 = screen.getByDisplayValue('Yes');
    const option2 = screen.getByDisplayValue('No');
    const option3 = screen.getByDisplayValue('Not sure');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });
});
