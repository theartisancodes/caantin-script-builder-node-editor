'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Textarea } from '@ui/textarea';
import { PlusCircle, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import NodePreview from '@components/WorkflowEditor/NodePreview';
import { NodeData, NodePropertiesPanelProps } from '@/types';

const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({
  node,
  onUpdate,
  onClose
}) => {
  const [originalData, setOriginalData] = useState<NodeData>(node.data);
  const [nodeData, setNodeData] = useState<NodeData>(node.data);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setNodeData(node.data);
    setOriginalData(node.data);
    setHasChanges(false);
  }, [node.data]);

  const handleSave = () => {
    onUpdate(nodeData);
    setOriginalData(nodeData);
    setHasChanges(false);
    onClose?.();
  };

  const updateOption = (index: number, value: string) => {
    if (
      (node.type === 'question' || node.type === 'decision') &&
      nodeData.options
    ) {
      const newOptions = [...nodeData.options];
      newOptions[index] = value;
      updateNodeData({
        ...nodeData,
        options: newOptions
      });
    }
  };
  const updateNodeData = (newData: NodeData) => {
    setNodeData(newData);
    setHasChanges(JSON.stringify(newData) !== JSON.stringify(originalData));
  };
  const addOption = () => {
    if (
      (node.type === 'question' || node.type === 'decision') &&
      nodeData.options
    ) {
      updateNodeData({
        ...nodeData,
        options: [...nodeData.options, '']
      });
    }
  };

  const removeOption = (index: number) => {
    if (
      (node.type === 'question' || node.type === 'decision') &&
      nodeData.options
    ) {
      const newOptions = [...nodeData.options];
      newOptions.splice(index, 1);
      updateNodeData({
        ...nodeData,
        options: newOptions
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto pb-20 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground">
        <div className="space-y-4 pb-24">
          <h2 className="text-lg font-bold capitalize">
            {node.type} Node Properties
          </h2>

          <div className="mb-6 pt-2">
            <Label className="mb-2 block text-sm text-muted-foreground">
              Preview
            </Label>
            <div className="flex justify-center py-4">
              <div className="origin-center scale-90 transform">
                <NodePreview
                  type={node.type}
                  data={nodeData}
                  theme={resolvedTheme}
                />
              </div>
            </div>
          </div>

          {(node.type === 'greeting' || node.type === 'information') && (
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={nodeData.message || ''}
                onChange={(e) =>
                  updateNodeData({ ...nodeData, message: e.target.value })
                }
                className="min-h-24"
              />
            </div>
          )}

          {node.type === 'question' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  value={nodeData.question || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, question: e.target.value })
                  }
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addOption}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle size={14} /> Add
                  </Button>
                </div>

                {nodeData.options?.map((option: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeOption(index)}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {node.type === 'decision' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Textarea
                  id="condition"
                  value={nodeData.condition || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, condition: e.target.value })
                  }
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addOption}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle size={14} /> Add
                  </Button>
                </div>

                {nodeData.options?.map((option: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeOption(index)}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {node.type === 'knowledge' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={nodeData.title || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, title: e.target.value })
                  }
                  placeholder="Knowledge Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={nodeData.content || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, content: e.target.value })
                  }
                  className="min-h-24"
                  placeholder="Knowledge content..."
                />
              </div>
            </>
          )}

          {node.type === 'database' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="operation">Operation</Label>
                <Input
                  id="operation"
                  value={nodeData.operation || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, operation: e.target.value })
                  }
                  placeholder="Query, Insert, Update, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entity">Entity</Label>
                <Input
                  id="entity"
                  value={nodeData.entity || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, entity: e.target.value })
                  }
                  placeholder="Table or collection name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">SQL/Query Details</Label>
                <Textarea
                  id="details"
                  value={nodeData.details || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, details: e.target.value })
                  }
                  className="min-h-24 font-mono text-sm"
                  placeholder="SELECT * FROM users WHERE..."
                />
              </div>
            </>
          )}

          {node.type === 'transfer' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={nodeData.destination || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, destination: e.target.value })
                  }
                  placeholder="Department or team name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferMessage">Message</Label>
                <Textarea
                  id="transferMessage"
                  value={nodeData.message || ''}
                  onChange={(e) =>
                    updateNodeData({ ...nodeData, message: e.target.value })
                  }
                  className="min-h-24"
                  placeholder="Transfer message..."
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="l absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4">
        {hasChanges && (
          <Button className="w-full" onClick={handleSave}>
            Apply Changes
          </Button>
        )}
      </div>
    </div>
  );
};

export default NodePropertiesPanel;
