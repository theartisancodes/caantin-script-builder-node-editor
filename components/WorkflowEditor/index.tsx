'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  MarkerType,
  NodeMouseHandler,
  NodeTypes,
  Node as ReactFlowNode,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Menu, X, ZoomIn } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTheme } from 'next-themes';
import NodePropertiesPanel from '@components/WorkflowEditor/NodePanelProperties';
import SaveWorkFlow from '@components/WorkflowEditor/SaveWorkflow';
import { defaultNodeData, flowColors, templateNodeData } from '@/constants';
import NodePanel from './NodePanel';
import Nodes from './Nodes';
import TemplatesPanel from './TemplatesPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NodeData, NodeType, WorkflowTemplate } from '@/types';

const nodeTypesMap: NodeTypes = {
  greeting: (props) => <Nodes {...props} type="greeting" />,
  question: (props) => <Nodes {...props} type="question" />,
  information: (props) => <Nodes {...props} type="information" />,
  decision: (props) => <Nodes {...props} type="decision" />,
  knowledge: (props) => <Nodes {...props} type="knowledge" />,
  database: (props) => <Nodes {...props} type="database" />,
  transfer: (props) => <Nodes {...props} type="transfer" />
};

const WorkflowEditor = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState('nodes');

  const getNodeColors = (type: NodeType, isDark: boolean) => {
    const colors = flowColors[type] || flowColors.greeting;
    return {
      background: isDark ? colors.dark.background : colors.light.background,
      border: isDark ? colors.dark.border : colors.light.border
    };
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: {
              stroke: isDark ? '#4b5563' : '#94a3b8',
              strokeWidth: 1.5
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: isDark ? '#4b5563' : '#94a3b8'
            }
          },
          eds
        )
      );
    },
    [setEdges, isDark]
  );

  const handleNodeUpdate = useCallback(
    (data: NodeData) => {
      if (!selectedNode) return;

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            const nodeType = node.type as NodeType;
            const colors = getNodeColors(nodeType, isDark);

            return {
              ...node,
              data: {
                ...data,
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
    },
    [selectedNode, setNodes, isDark]
  );

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode(node);
    setShowPropertiesPanel(true);
  }, []);

  const addNodeToFlow = (nodeType: NodeType) => {
    const position = { x: 100, y: 100 + nodes.length * 80 };
    const nodeData = defaultNodeData[nodeType];

    if (!nodeData) return;

    const colors = getNodeColors(nodeType, isDark);

    const newNode = {
      id: nanoid(),
      type: nodeType,
      position,
      data: {
        ...nodeData,
        nodeType
      },
      style: {
        background: colors.background,
        borderColor: colors.border,
        borderWidth: 1.5,
        borderStyle: 'solid',
        backgroundColor: colors.background,
        opacity: 0.8
      }
    };

    setNodes((nds) => [...nds, newNode]);

    if (window.innerWidth < 768) {
      setShowSidebar(false);
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
            ...node.data,
            isDark
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

  const handleZoomChange = (zoom: number) => {
    setZoomLevel(zoom);
  };

  const saveWorkflowAsTemplate = (
    template: WorkflowTemplate
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        console.log('Sending workflow template to backend:', template);
        setActiveTab('templates');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleSelectTemplate = (template: WorkflowTemplate) => {
    if (!template.nodes || !template.edges) {
      const { nodes, edges } = templateNodeData(isDark);
      const fullTemplateData = {
        ...template,
        description: template.description || '',
        nodes,
        edges
      };
      setNodes(fullTemplateData.nodes);
      setEdges(fullTemplateData.edges);
    } else {
      setNodes(template.nodes);
      setEdges(template.edges);
    }
  };
  return (
    <div className="relative flex h-full w-full flex-col bg-background md:flex-row">
      <div className="absolute right-6 top-6 z-10">
        <SaveWorkFlow
          nodes={nodes as ReactFlowNode[]}
          edges={edges}
          onSave={saveWorkflowAsTemplate}
        />
      </div>

      <div className="flex items-center justify-between border-b border-border p-2 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex items-center gap-2"
        >
          <Menu size={16} />
          {showSidebar ? 'Hide' : 'Show'} Panel
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileControls(!showMobileControls)}
            className="flex items-center gap-1"
          >
            <ZoomIn size={16} />
            {(zoomLevel * 100).toFixed(0)}%
          </Button>

          {selectedNode && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPropertiesPanel(!showPropertiesPanel)}
            >
              {showPropertiesPanel ? 'Hide' : 'Edit'} Properties
            </Button>
          )}
        </div>
      </div>

      <div
        className={`${
          showSidebar
            ? 'max-h-64 overflow-y-auto md:max-h-full md:w-72'
            : 'max-h-0 overflow-hidden md:max-h-full md:w-0'
        } shrink-0 border-b border-border transition-all duration-300 md:border-b-0 md:border-r`}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-semibold">Workflow Builder</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(false)}
            className="md:hidden"
          >
            <X size={18} />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nodes">Nodes</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="nodes">
            <NodePanel onAddNode={addNodeToFlow} />
          </TabsContent>

          <TabsContent value="templates">
            <TemplatesPanel onSelectTemplate={handleSelectTemplate} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-1 flex-col md:h-full md:flex-row">
        <div className="relative flex-1 overflow-hidden p-4">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypesMap}
            fitView
            proOptions={{ hideAttribution: true }}
            className={`h-full w-full rounded-md border border-border transition-colors ${isDark ? 'react-flow-dark' : 'react-flow-light'}`}
            onPaneClick={() => {
              setSelectedNode(null);
              setShowPropertiesPanel(false);
            }}
            onMove={(_e, viewport) => handleZoomChange(viewport.zoom)}
          >
            <Background color={isDark ? '#374151' : '#e2e8f0'} size={1.5} />
            <Controls
              className="rounded-md border border-border bg-background"
              showInteractive={false}
            />
          </ReactFlow>
        </div>
        {selectedNode && (
          <div
            className={`${
              showPropertiesPanel
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0 md:pointer-events-none md:translate-y-0 md:opacity-0'
            } fixed bottom-0 left-0 right-0 z-20 h-[70vh] border-t border-border bg-background p-4 shadow-lg transition-all duration-300 md:relative md:h-auto md:w-72 md:shrink-0 md:border-l md:border-t-0 md:shadow-none`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Properties</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowPropertiesPanel(false);
                  setSelectedNode(null);
                }}
              >
                <X size={18} />
              </Button>
            </div>
            <NodePropertiesPanel
              node={selectedNode as any}
              onUpdate={(data) => {
                handleNodeUpdate(data);
                setShowPropertiesPanel(false);
                setSelectedNode(null);
              }}
              onClose={() => {
                setShowPropertiesPanel(false);
                setSelectedNode(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowEditor;
