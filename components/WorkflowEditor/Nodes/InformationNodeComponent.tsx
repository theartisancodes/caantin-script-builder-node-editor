'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { Handle, Position } from 'reactflow';

const InformationNodeComponent = ({ data }) => {
  const isDark = data.isDark;

  return (
    <div
      className={`w-64 rounded-md border-2 px-4 py-2 shadow-sm ${isDark ? 'border-amber-600 bg-amber-950/50' : 'border-amber-500 bg-amber-50'}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={isDark ? 'bg-slate-400' : 'bg-slate-700'}
      />
      <div className="flex items-center gap-2">
        <Info size={18} className="text-amber-500" />
        <div className="font-medium">Information</div>
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

export default InformationNodeComponent;
