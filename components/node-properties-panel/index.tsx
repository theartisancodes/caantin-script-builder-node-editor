'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface NodeData {
  label: string;
  type?: string;
  message?: string;
  question?: string;
  options?: string[];
}

interface Node {
  id: string;
  type: string;
  data: NodeData;
  position: { x: number; y: number };
}

interface NodePropertiesPanelProps {
  node: Node | null;
  onUpdate: (updatedNode: Node) => void;
  onDelete: (id: string) => void;
}

export default function NodePropertiesPanel({
  node,
  onUpdate,
  onDelete
}: NodePropertiesPanelProps) {
  const [nodeData, setNodeData] = useState<NodeData>({
    label: '',
    message: '',
    question: '',
    options: []
  });
  const [newOption, setNewOption] = useState('');

  useEffect(() => {
    if (node) {
      setNodeData({
        label: node.data.label || '',
        message: node.data.message || '',
        question: node.data.question || '',
        options: node.data.options || [],
        type: node.type
      });
    }
  }, [node]);

  if (!node) {
    return (
      <p className="p-4 text-gray-500">Select a node to edit properties.</p>
    );
  }

  const handleUpdate = () => {
    onUpdate({
      ...node,
      data: { ...nodeData }
    });
  };

  const addOption = () => {
    if (newOption.trim() !== '') {
      setNodeData({
        ...nodeData,
        options: [...(nodeData.options || []), newOption.trim()]
      });
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    const newOptions = [...(nodeData.options || [])];
    newOptions.splice(index, 1);
    setNodeData({ ...nodeData, options: newOptions });
  };

  const getNodeColor = () => {
    switch (node.type) {
      case 'greeting':
        return 'bg-blue-100 border-blue-500';
      case 'question':
        return 'bg-yellow-100 border-yellow-500';
      case 'information':
        return 'bg-green-100 border-green-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  return (
    <Card className="w-full rounded-xl border p-4 shadow-md">
      <h2 className="mb-3 text-lg font-semibold">Node Properties</h2>
      <div className="mb-4">
        <Label className="mb-2 block">Node Type</Label>
        <div className="rounded bg-gray-200 px-3 py-2 text-sm font-medium">
          {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
        </div>
      </div>

      <div className="mb-4">
        <Label className="mb-2 block">Label</Label>
        <Input
          value={nodeData.label}
          onChange={(e) => setNodeData({ ...nodeData, label: e.target.value })}
          className="w-full"
        />
      </div>

      {node.type === 'greeting' && (
        <div className="mb-4">
          <Label className="mb-2 block">Greeting Message</Label>
          <Textarea
            value={nodeData.message || ''}
            onChange={(e) =>
              setNodeData({ ...nodeData, message: e.target.value })
            }
            className="min-h-[100px] w-full"
            placeholder="Enter your greeting message here..."
          />
        </div>
      )}

      {node.type === 'information' && (
        <div className="mb-4">
          <Label className="mb-2 block">Information Message</Label>
          <Textarea
            value={nodeData.message || ''}
            onChange={(e) =>
              setNodeData({ ...nodeData, message: e.target.value })
            }
            className="min-h-[100px] w-full"
            placeholder="Enter your information message here..."
          />
        </div>
      )}

      {node.type === 'question' && (
        <>
          <div className="mb-4">
            <Label className="mb-2 block">Question Text</Label>
            <Textarea
              value={nodeData.question || ''}
              onChange={(e) =>
                setNodeData({ ...nodeData, question: e.target.value })
              }
              className="min-h-[80px] w-full"
              placeholder="Enter your question here..."
            />
          </div>

          <div className="mb-4">
            <Label className="mb-2 block">Answer Options</Label>
            <div className="mb-2 flex gap-2">
              <Input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new option"
                className="flex-1"
              />
              <Button onClick={addOption}>Add</Button>
            </div>
            <div className="mt-2 space-y-2">
              {nodeData.options &&
                nodeData.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2"
                  >
                    <span>{option}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500"
                      onClick={() => removeOption(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              {(!nodeData.options || nodeData.options.length === 0) && (
                <p className="text-sm text-gray-500">No options added yet</p>
              )}
            </div>
          </div>
        </>
      )}

      <Button className="mt-3 w-full" onClick={handleUpdate}>
        Update Node
      </Button>

      <Button
        className="mt-3 w-full bg-red-500 text-white hover:bg-red-600"
        onClick={() => onDelete(node.id)}
      >
        Delete Node
      </Button>

      <h3 className="text-md mt-5 font-semibold">Preview</h3>
      <CardContent className={`mt-2 rounded-lg border p-4 ${getNodeColor()}`}>
        <div className="mb-2 font-bold">{nodeData.label}</div>

        {node.type === 'greeting' && nodeData.message && (
          <p className="text-sm">{nodeData.message}</p>
        )}

        {node.type === 'information' && nodeData.message && (
          <p className="text-sm">{nodeData.message}</p>
        )}

        {node.type === 'question' && (
          <>
            <p className="mb-2 text-sm">{nodeData.question}</p>
            {nodeData.options && nodeData.options.length > 0 && (
              <div className="space-y-1">
                {nodeData.options.map((option, idx) => (
                  <div
                    key={idx}
                    className="rounded bg-white/50 px-2 py-1 text-xs"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
