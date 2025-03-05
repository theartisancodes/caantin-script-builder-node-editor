'use client';

import { Node } from '@/types';

interface NodePreviewProps {
  node: Node;
}

const NodePreview = ({ node }: NodePreviewProps) => {
  const getBorderColor = () => {
    switch (node.type) {
      case 'greeting':
        return 'border-blue-500';
      case 'question':
        return 'border-green-500';
      case 'information':
        return 'border-amber-500';
      default:
        return 'border-gray-300';
    }
  };

  const renderContent = () => {
    switch (node.type) {
      case 'greeting':
        return <p className="text-sm">{node.data.message}</p>;
      case 'question':
        return (
          <div>
            <p className="font-medium">{node.data.question}</p>
            <div className="mt-2 space-y-1">
              {node.data.options.map((option, index) => (
                <div
                  key={index}
                  className="rounded bg-background/80 px-2 py-1 text-xs"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        );
      case 'information':
        return <p className="text-sm">{node.data.message}</p>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-[300px] max-w-full rounded-lg border-2 ${getBorderColor()} bg-card p-4 shadow-md`}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${
            node.type === 'greeting'
              ? 'bg-blue-500'
              : node.type === 'question'
                ? 'bg-green-500'
                : 'bg-amber-500'
          }`}
        />
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          {node.type}
        </h3>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default NodePreview;
