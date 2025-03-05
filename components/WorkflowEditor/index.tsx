'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  MarkerType,
  Node as ReactFlowNode,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { X } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTheme } from 'next-themes';
import NodePropertiesPanel from '@components/WorkflowEditor/NodePanelProperties';
import { defaultNodeData, flowColors } from '@/constants';
import NodePanel from './NodePanel';
import Nodes from './Nodes';
import { Button } from '@/components/ui/button';
import { Node, NodeType } from '@/types';

interface NodeProps {
  id: string;
  data: any;
  selected: boolean;
  [key: string]: any;
}

const GreetingNodeComponent = (props: NodeProps) => (
  <Nodes {...props} type="greeting" />
);
const QuestionNodeComponent = (props: NodeProps) => (
  <Nodes {...props} type="question" />
);
const InformationNodeComponent = (props: NodeProps) => (
  <Nodes {...props} type="information" />
);
const DecisionNodeComponent = (props: NodeProps) => (
  <Nodes {...props} type="decision" />
);
const KnowledgeNodeComponent = (props: NodeProps) => (
  <Nodes {...props} type="knowledge" />
);
const DatabaseNodeComponent = (props: NodeProps) => (
  <Nodes {...props} type="database" />
);
const TransferNodeComponent = (props: NodeProps) => (
  <Nodes {...props} type="transfer" />
);

const nodeTypes = {
  greeting: GreetingNodeComponent,
  question: QuestionNodeComponent,
  information: InformationNodeComponent,
  decision: DecisionNodeComponent,
  knowledge: KnowledgeNodeComponent,
  database: DatabaseNodeComponent,
  transfer: TransferNodeComponent
};

const getEdgeStyle = (sourceNode: any, targetNode: any, isDark: boolean) => {
  if (!sourceNode) return { stroke: '#64748b', strokeWidth: 2 };

  const nodeType = sourceNode.type as NodeType;
  const validType = Object.keys(flowColors).includes(nodeType)
    ? nodeType
    : 'greeting';
  const colors = flowColors[validType];

  return {
    stroke: isDark ? colors.dark.edge : colors.light.edge,
    strokeWidth: 2
  };
};

const getNodeColors = (nodeType: NodeType, isDark: boolean) => {
  const validType = Object.keys(flowColors).includes(nodeType)
    ? nodeType
    : 'greeting';
  const colors = flowColors[validType];

  return {
    background: isDark ? colors.dark.background : colors.light.background,
    border: isDark ? colors.dark.border : colors.light.border
  };
};

const WorkflowEditor = () => {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showNodePanel, setShowNodePanel] = useState(true);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      const edgeStyle = getEdgeStyle(sourceNode, targetNode, isDark);

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: edgeStyle.stroke
            },
            style: edgeStyle
          },
          eds
        )
      );
    },
    [setEdges, isDark, nodes]
  );

  const addNodeToFlow = (nodeType: NodeType) => {
    const position = { x: 100, y: 100 + nodes.length * 100 };
    const nodeData = defaultNodeData[nodeType];

    if (!nodeData) return;

    const colors = getNodeColors(nodeType, isDark);

    const newNode = {
      id: nanoid(),
      type: nodeType,
      position,
      data: {
        ...nodeData,
        isDark,
        nodeType
      },
      style: {
        background: colors.background,
        borderColor: colors.border,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: colors.background,
        opacity: 0.8
      }
    };

    setNodes((nds) => [...nds, newNode]);

    if (window.innerWidth < 768) {
      setShowNodePanel(false);
    }
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const nodeType = node.type as NodeType;
        const colors = getNodeColors(nodeType, isDark);

        return {
          ...node,
          data: {
            ...node.data
          },
          style: {
            ...node.style,
            background: colors.background,
            backgroundColor: colors.background,
            borderColor: colors.border,
            opacity: 0.8
          }
        };
      })
    );
  }, [isDark, setNodes]);

  const nodeMap = useMemo(() => {
    return nodes.reduce(
      (map, node) => {
        map[node.id] = node;
        return map;
      },
      {} as Record<string, any>
    );
  }, [nodes]);

  // Separate effect for updating edge styles
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const sourceNode = nodeMap[edge.source];
        const targetNode = nodeMap[edge.target];

        const edgeStyle = getEdgeStyle(sourceNode, targetNode, isDark);

        return {
          ...edge,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: edgeStyle.stroke
          },
          style: edgeStyle
        };
      })
    );
  }, [isDark, nodeMap, setEdges]);

  const onNodeClick = (_: React.MouseEvent, node: ReactFlowNode) => {
    setSelectedNode(node as Node);
    setShowPropertiesPanel(true);
  };

  const updateNodeData = (nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const nodeType = node.type as NodeType;
          const colors = getNodeColors(nodeType, isDark);

          return {
            ...node,
            data: {
              ...data,
              isDark,
              nodeType: node.type
            },
            style: {
              ...node.style,
              background: colors.background,
              backgroundColor: colors.background,
              borderColor: colors.border
            }
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="relative flex h-full w-full bg-background">
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
      <div className="flex h-full flex-1">
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
      </div>
    </div>
  );
};

export default WorkflowEditor;
