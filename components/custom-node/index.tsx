// components/custom-node/index.tsx
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useNodeStore } from '@/store';

interface CustomNodeProps {
  data: {
    label: string;
    message?: string;
    question?: string;
    options?: string[];
  };
  id: string;
  type: string;
  selected?: boolean;
}

const CustomNode: React.FC<CustomNodeProps> = ({
  data,
  id,
  type,
  selected
}) => {
  const { deleteNode } = useNodeStore();
  const [isHovered, setIsHovered] = useState(false);

  const getNodeStyles = () => {
    const baseStyles =
      'transition-all duration-200 border-2 rounded-lg shadow-sm';
    const selectedStyles = selected ? 'shadow-md ring-2 ring-offset-1' : '';

    switch (type) {
      case 'greeting':
        return `${baseStyles} ${selectedStyles} bg-blue-50 border-blue-400 ${selected ? 'ring-blue-300' : ''}`;
      case 'question':
        return `${baseStyles} ${selectedStyles} bg-yellow-50 border-yellow-400 ${selected ? 'ring-yellow-300' : ''}`;
      case 'information':
        return `${baseStyles} ${selectedStyles} bg-green-50 border-green-400 ${selected ? 'ring-green-300' : ''}`;
      default:
        return `${baseStyles} ${selectedStyles} bg-gray-50 border-gray-400 ${selected ? 'ring-gray-300' : ''}`;
    }
  };

  const getHeaderStyles = () => {
    switch (type) {
      case 'greeting':
        return 'bg-blue-200 text-blue-800';
      case 'question':
        return 'bg-yellow-200 text-yellow-800';
      case 'information':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getIconByType = () => {
    switch (type) {
      case 'greeting':
        return '👋';
      case 'question':
        return '❓';
      case 'information':
        return 'ℹ️';
      default:
        return '📄';
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div
      className={`w-[240px] ${getNodeStyles()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center justify-between rounded-t-md p-2 ${getHeaderStyles()}`}
      >
        <div className="flex items-center">
          <span className="mr-2 text-lg">{getIconByType()}</span>
          <div className="text-sm font-semibold">{data.label}</div>
        </div>
        {isHovered && (
          <button
            className="text-gray-500 transition-colors hover:text-red-600"
            onClick={handleDelete}
          >
            ✕
          </button>
        )}
      </div>

      <div className="p-3">
        {type === 'greeting' && data.message && (
          <div className="text-sm text-gray-700">{data.message}</div>
        )}

        {type === 'information' && data.message && (
          <div className="text-sm text-gray-700">{data.message}</div>
        )}

        {type === 'question' && data.question && (
          <div className="text-sm">
            <div className="font-medium text-gray-700">{data.question}</div>
            {data.options && data.options.length > 0 && (
              <div className="mt-2 space-y-1">
                {data.options.map((option, idx) => (
                  <div
                    key={idx}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 border-2 border-white bg-gray-400"
        id={`${id}-target`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-3 w-3 border-2 border-white bg-gray-400"
        id={`${id}-source`}
      />
    </div>
  );
};

export default CustomNode;
