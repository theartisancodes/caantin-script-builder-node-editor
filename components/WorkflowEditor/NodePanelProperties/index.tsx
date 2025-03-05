'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Textarea } from '@ui/textarea';
import { PlusCircle, X } from 'lucide-react';
import { Node } from '@/types';

interface NodePropertiesPanelProps {
  node: Node;
  onUpdate: (data: any) => void;
}

const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({
  node,
  onUpdate
}) => {
  const [nodeData, setNodeData] = useState(node.data);

  useEffect(() => {
    setNodeData(node.data);
  }, [node.data]);

  const handleSave = () => {
    onUpdate(nodeData);
  };

  const addOption = () => {
    if (node.type === 'question' && nodeData.options) {
      setNodeData({
        ...nodeData,
        options: [...nodeData.options, '']
      });
    }
  };

  const removeOption = (index: number) => {
    if (node.type === 'question' && nodeData.options) {
      const newOptions = [...nodeData.options];
      newOptions.splice(index, 1);
      setNodeData({
        ...nodeData,
        options: newOptions
      });
    }
  };

  const updateOption = (index: number, value: string) => {
    if (node.type === 'question' && nodeData.options) {
      const newOptions = [...nodeData.options];
      newOptions[index] = value;
      setNodeData({
        ...nodeData,
        options: newOptions
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold capitalize">
        {node.type} Node Properties
      </h2>

      {(node.type === 'greeting' || node.type === 'information') && (
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={nodeData.message}
            onChange={(e) =>
              setNodeData({ ...nodeData, message: e.target.value })
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
              value={nodeData.question}
              onChange={(e) =>
                setNodeData({ ...nodeData, question: e.target.value })
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

            {nodeData.options?.map((option, index) => (
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

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
};

export default NodePropertiesPanel;
