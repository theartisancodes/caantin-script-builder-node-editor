// components/WorkflowEditor/PreviewPanel.tsx
import React from 'react';
import { Edge } from 'reactflow';
import { Node } from '@/types';

interface PreviewPanelProps {
  nodes: Node[];
  edges: Edge[];
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ nodes, edges }) => {
  // Sort nodes to get a logical conversation flow
  const sortedNodes = [...nodes].sort((a, b) => {
    // Find edges where a is source and b is target
    const hasDirectConnection = edges.some(
      (edge) => edge.source === a.id && edge.target === b.id
    );

    if (hasDirectConnection) return -1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="mb-2 text-sm text-muted-foreground">
        {nodes.length === 0 ? (
          <p>Add nodes to see a preview of the conversation flow</p>
        ) : (
          <p>This is how your conversation will flow:</p>
        )}
      </div>

      {sortedNodes.map((node) => (
        <div
          key={node.id}
          className="space-y-2 rounded-lg border border-border p-4"
        >
          <div className="text-xs font-medium uppercase text-muted-foreground">
            {node.type}
          </div>

          {node.type === 'greeting' || node.type === 'information' ? (
            <div className="text-sm">{node.data.message}</div>
          ) : node.type === 'question' ? (
            <div className="space-y-2">
              <div className="text-sm font-medium">{node.data.question}</div>
              <ul className="space-y-1">
                {node.data.options?.map((option, index) => (
                  <li
                    key={index}
                    className="rounded bg-muted/50 px-2 py-1 text-xs"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Display connections */}
          {edges
            .filter((edge) => edge.source === node.id)
            .map((edge) => {
              const targetNode = nodes.find((n) => n.id === edge.target);
              return (
                <div
                  key={edge.id}
                  className="mt-2 text-xs text-muted-foreground"
                >
                  ↓ Connects to: {targetNode?.type || 'unknown'}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default PreviewPanel;
