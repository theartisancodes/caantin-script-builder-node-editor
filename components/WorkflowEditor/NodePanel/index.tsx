'use client';

import React from 'react';
import { HelpCircle, Info, MessageCircle } from 'lucide-react';
import { NodeType } from '@/types';

interface NodePanelProps {
  onAddNode: (nodeType: NodeType) => void;
}

const NodePanel: React.FC<NodePanelProps> = ({ onAddNode }) => {
  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-lg font-bold text-foreground">
        Conversation Nodes
      </h2>

      <div className="space-y-2">
        <button
          onClick={() => onAddNode('greeting')}
          className="flex w-full items-center gap-2 rounded-md border border-border p-2 text-left transition-colors hover:bg-muted"
        >
          <MessageCircle size={18} className="text-blue-500" />
          <span className="text-foreground">Greeting</span>
        </button>

        <button
          onClick={() => onAddNode('question')}
          className="flex w-full items-center gap-2 rounded-md border border-border p-2 text-left transition-colors hover:bg-muted"
        >
          <HelpCircle size={18} className="text-green-500" />
          <span className="text-foreground">Question</span>
        </button>

        <button
          onClick={() => onAddNode('information')}
          className="flex w-full items-center gap-2 rounded-md border border-border p-2 text-left transition-colors hover:bg-muted"
        >
          <Info size={18} className="text-amber-500" />
          <span className="text-foreground">Information</span>
        </button>
      </div>
    </div>
  );
};

export default NodePanel;
