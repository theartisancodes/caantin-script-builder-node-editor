'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import GreetingsNodeForm from '@/components/script-builder/forms/GreetingsNodeForm';
import InformationNodeForm from '@/components/script-builder/forms/InformationNodeForm';
import QuestionNodeForm from '@/components/script-builder/forms/QuestionNodeForm';
import NodePreview from '@/components/script-builder/NodePreview';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Node, NodeType } from '@/types';

const initialNodes: Record<NodeType, Node> = {
  greeting: {
    id: 'node-1',
    type: 'greeting',
    data: {
      message:
        "Hello, I'm calling from Caantin AI. Do you have a moment to discuss your business needs?"
    }
  },
  question: {
    id: 'node-2',
    type: 'question',
    data: {
      question: 'Are you currently using any AI solutions in your business?',
      options: ['Yes', 'No', 'Not sure']
    }
  },
  information: {
    id: 'node-3',
    type: 'information',
    data: {
      message:
        'Great! We have solutions that can complement your existing AI implementations.'
    }
  }
};

const NodePropertiesPanel = () => {
  const [activeNodeType, setActiveNodeType] = useState<NodeType>('greeting');
  const [nodes, setNodes] = useState<Record<NodeType, Node>>(initialNodes);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleNodeUpdate = (nodeData: Partial<Node['data']>) => {
    setNodes((prev) => ({
      ...prev,
      [activeNodeType]: {
        ...prev[activeNodeType],
        data: {
          ...prev[activeNodeType].data,
          ...nodeData
        }
      }
    }));
    setHasChanges(true);
    setErrors([]);
  };

  const validateNode = (node: Node): string[] => {
    const validationErrors = [];

    switch (node.type) {
      case 'greeting':
        if (!node.data.message.trim()) {
          validationErrors.push('Greeting message cannot be empty');
        }
        break;
      case 'question':
        if (!node.data.question.trim()) {
          validationErrors.push('Question text cannot be empty');
        }
        if (node.data.options.length === 0) {
          validationErrors.push('At least one option is required');
        } else {
          const emptyOptions = node.data.options.some((opt) => !opt.trim());
          if (emptyOptions) {
            validationErrors.push('Options cannot be empty');
          }
        }
        break;
      case 'information':
        if (!node.data.message.trim()) {
          validationErrors.push('Information message cannot be empty');
        }
        break;
    }

    return validationErrors;
  };

  const handleSave = () => {
    const currentNode = nodes[activeNodeType];
    const validationErrors = validateNode(currentNode);

    if (validationErrors.length === 0) {
      console.log('Node saved:', nodes[activeNodeType]);
      setHasChanges(false);
      setErrors([]);
    } else {
      setErrors(validationErrors);
    }
  };

  const renderForm = () => {
    const currentNode = nodes[activeNodeType];

    switch (activeNodeType) {
      case 'greeting':
        return (
          <GreetingsNodeForm
            data={currentNode.data as { message: string }}
            onChange={handleNodeUpdate}
          />
        );
      case 'question':
        return (
          <QuestionNodeForm
            data={currentNode.data as { question: string; options: string[] }}
            onChange={handleNodeUpdate}
          />
        );
      case 'information':
        return (
          <InformationNodeForm
            data={currentNode.data as { message: string }}
            onChange={handleNodeUpdate}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row">
      <div className="flex-1 rounded-lg bg-card p-6 shadow-md">
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold">Node Properties</h2>
          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              variant={activeNodeType === 'greeting' ? 'default' : 'outline'}
              onClick={() => {
                setActiveNodeType('greeting');
                setErrors([]);
              }}
            >
              Greeting
            </Button>
            <Button
              variant={activeNodeType === 'question' ? 'default' : 'outline'}
              onClick={() => {
                setActiveNodeType('question');
                setErrors([]);
              }}
            >
              Question
            </Button>
            <Button
              variant={activeNodeType === 'information' ? 'default' : 'outline'}
              onClick={() => {
                setActiveNodeType('information');
                setErrors([]);
              }}
            >
              Information
            </Button>
          </div>

          {errors.length > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <div className="rounded-md bg-muted/50 p-4">
            {renderForm()}
            <Button
              className="mt-4"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save Node
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="mb-4 text-2xl font-bold">Node Preview</h2>
        <div className="flex h-[500px] items-center justify-center rounded-lg bg-muted/30 p-6 shadow-md">
          <NodePreview node={nodes[activeNodeType]} />
        </div>
      </div>
    </div>
  );
};

export default NodePropertiesPanel;
