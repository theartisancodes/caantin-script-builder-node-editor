'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Handle, Position } from 'reactflow';

const GreetingNodeComponent = ({ data }) => {
  const isDark = data.isDark;

  return (
    <div
      className={`w-64 rounded-md border-2 px-4 py-2 shadow-sm ${isDark ? 'border-blue-600 bg-blue-950/50' : 'border-blue-500 bg-blue-50'}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={isDark ? 'bg-slate-400' : 'bg-slate-700'}
      />
      <div className="flex items-center gap-2">
        <MessageCircle size={18} className="text-blue-500" />
        <div className="font-medium">Greeting</div>
      </div>
      <div className="mt-2 text-sm text-foreground">{data.message}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className={isDark ? 'bg-slate-400' : 'bg-slate-700'}
      />
    </div>
  );
};

export default GreetingNodeComponent;
