'use client';

import React from 'react';
import {
  ArrowRightCircle,
  BookOpen,
  Database,
  GitBranch,
  HelpCircle,
  Info,
  MessageCircle
} from 'lucide-react';
import { NodeType } from '@/types';

interface NodePanelProps {
  onAddNode: (_: NodeType) => void;
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

        <button
          onClick={() => onAddNode('decision')}
          className="flex w-full items-center gap-2 rounded-md border border-border p-2 text-left transition-colors hover:bg-muted"
        >
          <GitBranch size={18} className="text-purple-500" />
          <span className="text-foreground">Decision</span>
        </button>

        <button
          onClick={() => onAddNode('knowledge')}
          className="flex w-full items-center gap-2 rounded-md border border-border p-2 text-left transition-colors hover:bg-muted"
        >
          <BookOpen size={18} className="text-indigo-500" />
          <span className="text-foreground">Knowledge</span>
        </button>

        <button
          onClick={() => onAddNode('database')}
          className="flex w-full items-center gap-2 rounded-md border border-border p-2 text-left transition-colors hover:bg-muted"
        >
          <Database size={18} className="text-cyan-500" />
          <span className="text-foreground">Database</span>
        </button>

        <button
          onClick={() => onAddNode('transfer')}
          className="flex w-full items-center gap-2 rounded-md border border-border p-2 text-left transition-colors hover:bg-muted"
        >
          <ArrowRightCircle size={18} className="text-rose-500" />
          <span className="text-foreground">Transfer</span>
        </button>
      </div>
    </div>
  );
};

export default NodePanel;
