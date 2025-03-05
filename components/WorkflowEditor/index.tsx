// components/WorkflowEditor/index.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  MarkerType,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTheme } from 'next-themes';
import NodePropertiesPanel from '@components/WorkflowEditor/NodePanelProperties';
import GreetingNodeComponent from '@components/WorkflowEditor/Nodes/GreetingNodeComponent';
import InformationNodeComponent from '@components/WorkflowEditor/Nodes/InformationNodeComponent';
import QuestionNodeComponent from '@components/WorkflowEditor/Nodes/QuestionNodeComponent';
import NodePanel from './NodePanel';
import PreviewPanel from './PreviewPanel';
import { Button } from '@/components/ui/button';
import {
  GreetingNode,
  InformationNode,
  Node,
  NodeType,
  QuestionNode
} from '@/types';

const nodeTypes = {
  greeting: GreetingNodeComponent,
  question: QuestionNodeComponent,
  information: InformationNodeComponent
};

const WorkflowEditor = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showNodePanel, setShowNodePanel] = useState(true);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            markerEnd: {
              type: MarkerType.ArrowClosed
            },
            style: { stroke: isDark ? '#94a3b8' : '#64748b' }
          },
          eds
        )
      );
    },
    [setEdges, isDark]
  );

  const addNodeToFlow = (nodeType: NodeType) => {
    const position = { x: 100, y: 100 + nodes.length * 100 };

    let newNode: Node;

    switch (nodeType) {
      case 'greeting':
        newNode = {
          id: nanoid(),
          type: 'greeting',
          data: { message: 'Hello! Welcome to our service.' }
        } as GreetingNode;
        break;
      case 'question':
        newNode = {
          id: nanoid(),
          type: 'question',
          data: {
            question: 'How can I help you?',
            options: ['Option 1', 'Option 2']
          }
        } as QuestionNode;
        break;
      case 'information':
        newNode = {
          id: nanoid(),
          type: 'information',
          data: { message: 'Here is some important information.' }
        } as InformationNode;
        break;
      default:
        return;
    }

    setNodes((nds) => [
      ...nds,
      {
        id: newNode.id,
        type: newNode.type,
        position,
        data: { ...newNode.data, isDark }
      }
    ]);

    // Auto-hide panel on mobile after adding a node
    if (window.innerWidth < 768) {
      setShowNodePanel(false);
    }
  };

  // Update all nodes when theme changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, isDark }
      }))
    );
  }, [isDark, setNodes]);

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
    setShowPropertiesPanel(true);
  };

  const updateNodeData = (nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...data, isDark } };
        }
        return node;
      })
    );
  };

  return (
    <div className="relative flex h-full w-full bg-background">
      {/* Mobile toggle buttons */}
      <div className="fixed left-2 top-16 z-10 flex gap-2 md:hidden">
        <Button
          variant="outline"
          size="sm"
          className="bg-background"
          onClick={() => setShowNodePanel(!showNodePanel)}
        >
          {showNodePanel ? 'Hide Nodes' : 'Show Nodes'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-background"
          onClick={() => setShowPreviewPanel(!showPreviewPanel)}
        >
          {showPreviewPanel ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

      {/* Node panel - collapsible on mobile */}
      <div
        className={`${
          showNodePanel ? 'flex' : 'hidden'
        } absolute z-20 h-full w-64 border-r border-border bg-muted/40 shadow-lg md:relative md:flex md:shadow-none`}
      >
        <div className="w-full p-4">
          <div className="mb-2 flex items-center justify-between md:hidden">
            <h3 className="font-semibold">Nodes</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNodePanel(false)}
            >
              <X size={18} />
            </Button>
          </div>
          <NodePanel onAddNode={addNodeToFlow} />
        </div>
      </div>

      {/* Main flow area */}
      <div className="flex h-full flex-1">
        {/* Properties panel - slide in on mobile, fixed on desktop */}
        {selectedNode && (
          <div
            className={`${
              showPropertiesPanel
                ? 'translate-y-0'
                : 'translate-y-full md:translate-y-0'
            } fixed bottom-0 left-0 right-0 z-20 h-3/4 border-t border-border bg-muted/40 p-4 shadow-lg transition-transform duration-300 md:static md:h-full md:w-72 md:border-r md:border-t-0 md:shadow-none`}
          >
            <div className="mb-4 flex items-center justify-between md:hidden">
              <h3 className="font-semibold">Properties</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPropertiesPanel(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <NodePropertiesPanel
              node={selectedNode}
              onUpdate={(data) => updateNodeData(selectedNode.id, data)}
            />
          </div>
        )}

        <div className="relative flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            className={isDark ? 'react-flow-dark' : 'react-flow-light'}
            onPaneClick={() => {
              setSelectedNode(null);
              setShowPropertiesPanel(false);
            }}
          >
            <Background color={isDark ? '#374151' : '#e2e8f0'} />
            <Controls className="rounded-md border border-border bg-background" />
          </ReactFlow>
        </div>

          {/* Desktop preview toggle */}
          <div className="hidden items-center border-l border-border md:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPreviewPanel(!showPreviewPanel)}
              className="h-8 w-8"
            >
              {showPreviewPanel ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </Button>
          </div>
        </div>

         Preview Panel
        <div
          className={`${
            showPreviewPanel ? 'flex' : 'hidden md:flex md:w-0 md:opacity-0'
          } fixed right-0 top-0 z-20 h-full w-full flex-col border-l border-border bg-background shadow-lg transition-all duration-300 md:relative md:w-80 md:shadow-none`}
        >
          <div className="flex items-center justify-between border-b border-border p-4">
            <h3 className="font-semibold">Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setShowPreviewPanel(false)}
            >
              <X size={18} />
            </Button>
          </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;
