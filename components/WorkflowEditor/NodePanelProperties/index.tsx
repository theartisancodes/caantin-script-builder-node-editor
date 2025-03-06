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

const NodePropertiesPanel = ({
  node,
  onUpdate,
  onClose
}: NodePropertiesPanelProps) => {
  const [originalData, setOriginalData] = useState<NodeData>(node.data);
  const [nodeData, setNodeData] = useState<NodeData>(node.data);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setNodeData(node.data);
    setOriginalData(node.data);
    setHasChanges(false);
    setErrors({});
  }, [node]);

  const validate = (newData: NodeData) => {
    const newErrors: Record<string, string> = {};

    if (
      (node.type === 'greeting' || node.type === 'information') &&
      !newData.message?.trim()
    ) {
      newErrors.message = 'Message is required.';
    }
    if (node.type === 'question' && !newData.question?.trim()) {
      newErrors.question = 'Question is required.';
    }

    if (node.type === 'question' || node.type === 'decision') {
      if (!newData.options?.length) {
        newErrors.options = 'At least one option is required.';
      } else if (newData.options.some((opt) => !opt.trim())) {
        newErrors.options = 'Options cannot be empty.';
      } else {
        const trimmedOptions = newData.options.map((opt) => opt.trim());
        const uniqueOptions = new Set(trimmedOptions);
        if (uniqueOptions.size !== trimmedOptions.length) {
          newErrors.options = 'Options must be unique.';
        }
      }
    }

    if (node.type === 'decision' && !newData.condition?.trim()) {
      newErrors.condition = 'Condition is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate(nodeData)) return;
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
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
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
                {errors.question && (
                  <p className="text-sm text-red-500">{errors.question}</p>
                )}
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
                {errors.options && (
                  <p className="text-sm text-red-500">{errors.options}</p>
                )}
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
                {errors.condition && (
                  <p className="text-sm text-red-500">{errors.condition}</p>
                )}
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
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
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
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content}</p>
                )}
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
                {errors.operation && (
                  <p className="text-sm text-red-500">{errors.operation}</p>
                )}
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
                {errors.entity && (
                  <p className="text-sm text-red-500">{errors.entity}</p>
                )}
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
                />{' '}
                {errors.details && (
                  <p className="text-sm text-red-500">{errors.details}</p>
                )}
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
                {errors.destination && (
                  <p className="text-sm text-red-500">{errors.destination}</p>
                )}
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
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="l absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4">
        {hasChanges && (
          <Button
            className={`flex w-full items-center gap-1 ${
              resolvedTheme === 'dark'
                ? 'bg-primary-300 text-white hover:bg-primary-500'
                : 'bg-primary-500 hover:bg-primary-300'
            }`}
            onClick={handleSave}
          >
            Apply Changes
          </Button>
        )}
      </div>
    </div>
  );
};

export default NodePropertiesPanel;
