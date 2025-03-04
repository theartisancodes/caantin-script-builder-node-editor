// components/node-palette/index.tsx
import { useCallback } from 'react';
import { useNodeStore } from '@/store';

type NodeTypeOption = {
  type: 'greeting' | 'question' | 'information';
  label: string;
  icon: string;
  description: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
};

const nodeTypes: NodeTypeOption[] = [
  {
    type: 'greeting',
    label: 'Greeting',
    icon: '👋',
    description: 'Welcome messages and introductions',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-400',
    hoverColor: 'hover:bg-blue-200'
  },
  {
    type: 'question',
    label: 'Question',
    icon: '❓',
    description: 'Ask users for input or choices',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-400',
    hoverColor: 'hover:bg-yellow-200'
  },
  {
    type: 'information',
    label: 'Information',
    icon: 'ℹ️',
    description: 'Provide helpful information',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-400',
    hoverColor: 'hover:bg-green-200'
  }
];

export function NodePalette() {
  const { addNode } = useNodeStore();

  const onDragStart = useCallback(
    (event: React.DragEvent, nodeType: NodeTypeOption['type']) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  return (
    <div className="w-full max-w-xs rounded-lg bg-white p-4 shadow-md">
      <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
        Node Types
      </h3>
      <div className="space-y-3">
        {nodeTypes.map((nodeOption) => (
          <div
            key={nodeOption.type}
            className={`flex cursor-grab items-center rounded-md border p-3 transition-all ${nodeOption.bgColor} ${nodeOption.borderColor} ${nodeOption.hoverColor} transform hover:-translate-y-0.5 hover:shadow-md`}
            draggable
            onDragStart={(event) => onDragStart(event, nodeOption.type)}
          >
            <div className="mr-3 text-2xl">{nodeOption.icon}</div>
            <div>
              <div className="font-medium text-gray-800">
                {nodeOption.label}
              </div>
              <div className="text-xs text-gray-600">
                {nodeOption.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs italic text-gray-500">
        Drag and drop nodes onto the canvas
      </div>
    </div>
  );
}

export default NodePalette;
