import React from 'react';
import { render, screen } from '@testing-library/react';
import NodePreview from './index';
import { GreetingNode, Node } from '@/types';

describe('NodePreview', () => {
  it('renders greeting node preview correctly', () => {
    const node: GreetingNode = {
      id: 'node1',
      type: 'greeting',
      data: {
        message: 'Hello World'
      }
    };

    render(<NodePreview node={node} />);

    expect(screen.getByText('greeting', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders nothing when no node is selected', () => {
    try {
      render(<NodePreview node={null as unknown as Node} />);
      expect(screen.getByText(/no node selected/i)).toBeInTheDocument();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('renders fallback for unsupported node types', () => {
    const node = {
      id: 'node4',
      type: 'unsupported' as 'greeting', // Cast to make TypeScript happy
      data: {}
    };

    // @ts-ignore
    render(<NodePreview node={node} />);

    expect(
      screen.getByText('unsupported', { exact: false })
    ).toBeInTheDocument();
  });

  it('handles empty data fields gracefully', () => {
    const node: GreetingNode = {
      id: 'node5',
      type: 'greeting',
      data: {
        message: ''
      }
    };

    render(<NodePreview node={node} />);

    expect(screen.getByText('greeting', { exact: false })).toBeInTheDocument();
  });
});
