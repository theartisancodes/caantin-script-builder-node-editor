'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Handle, Position } from 'reactflow';

const QuestionNodeComponent = ({ data }) => {
  const isDark = data.isDark;

  return (
    <div
      className={`w-64 rounded-md border-2 px-4 py-2 shadow-sm ${isDark ? 'border-green-600 bg-green-950/50' : 'border-green-500 bg-green-50'}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={isDark ? 'bg-slate-400' : 'bg-slate-700'}
      />
      <div className="flex items-center gap-2">
        <HelpCircle size={18} className="text-green-500" />
        <div className="font-medium">Question</div>
      </div>
      <div className="mt-2 text-sm">
        <div className="mb-1 text-foreground">{data.question}</div>
        <div className="space-y-1">
          {data.options?.map((option, index) => (
            <div
              key={index}
              className={`rounded border px-2 py-1 text-foreground ${isDark ? 'border-green-800 bg-green-900/30' : 'border-green-200 bg-white'}`}
            >
              {option}
              <Handle
                type="source"
                position={Position.Right}
                id={`option-${index}`}
                style={{ top: `${50 + index * 20}%` }}
                className={isDark ? 'bg-slate-400' : 'bg-slate-700'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionNodeComponent;
