'use client';

import React from 'react';
import { nodeConfig } from '@/constants';
import { Button } from '@/components/ui/button';
import { NodeType } from '@/types';

type NodePanelProps = {
  onAddNode: (_: NodeType) => void;
};

const NodePanel: React.FC<NodePanelProps> = ({ onAddNode }) => {
  const nodeTypes: NodeType[] = [
    'greeting',
    'question',
    'information',
    'decision',
    'knowledge',
    'database',
    'transfer'
  ];

  return (
    <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-1">
      {nodeTypes.map((type) => {
        const config = nodeConfig[type];
        const IconComponent = config.icon;

        return (
          <Button
            key={type}
            variant="outline"
            onClick={() => onAddNode(type)}
            className="flex items-center justify-start gap-2 text-xs sm:text-sm"
          >
            <IconComponent size={16} className="shrink-0" />
            <span className="truncate">{config.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default NodePanel;
