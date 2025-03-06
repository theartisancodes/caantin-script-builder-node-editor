'use client';

import { useState } from 'react';
import { Button } from '@ui/button';
import { SaveIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTheme } from 'next-themes';

interface Template {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  nodes: any[];
  edges: any[];
  connections?: { sourceNodeId: string; targetNodeId: string }[];
}

interface SaveFlowButtonProps {
  nodes: any[];
  edges: any[];
  onSave?: (_: Template) => Promise<void>;
}

const SaveWorkFlow = ({ nodes, edges, onSave }: SaveFlowButtonProps) => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });

  const { resolvedTheme } = useTheme();

  const handleSave = async () => {
    if (nodes.length === 0) {
      setMessage({
        type: 'error',
        text: 'Cannot save empty workflow. Please add at least one node.'
      });
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
      return;
    }

    setSaving(true);
    try {
      const connections = edges.map((edge) => ({
        sourceNodeId: edge.source,
        targetNodeId: edge.target
      }));

      const template: Template = {
        id: nanoid(),
        name: 'New Workflow Template',
        description: 'Custom workflow template',
        createdAt: new Date().toISOString().split('T')[0],
        nodes,
        edges,
        connections
      };

      await onSave?.(template);

      setMessage({
        type: 'success',
        text: 'Workflow template saved successfully!'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save workflow'
      });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <Button
        onClick={handleSave}
        variant="default"
        size="sm"
        className={`flex w-full items-center gap-1 ${
          resolvedTheme === 'dark'
            ? 'bg-primary-300 text-white hover:bg-primary-500'
            : 'bg-primary-500 hover:bg-primary-300'
        }`}
        disabled={saving}
      >
        <SaveIcon size={16} />
        {saving ? 'Saving...' : 'Save as Template'}
      </Button>

      {message.type && (
        <div
          className={`mt-2 rounded p-2 text-sm ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default SaveWorkFlow;
