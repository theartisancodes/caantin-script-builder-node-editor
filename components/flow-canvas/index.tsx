// components/flow-canvas/index.tsx
import { DragEvent, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  EdgeChange,
  NodeChange,
  Panel,
  ReactFlowInstance,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../custom-node';
import NodePalette from '../node-palette';
import { useNodeStore } from '@/store';

// Define custom node types
const nodeTypes = {
  greeting: CustomNode,
  question: CustomNode,
  information: CustomNode
};

export function FlowCanvas() {
  const { nodes, edges, setNodes, setEdges, addNode } = useNodeStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Use ReactFlow's utilities for smoother node changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  // Handle connections between nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      // Don't allow connection to self
      if (connection.source === connection.target) return;

      // Create a unique ID for the edge
      const edgeId = `e-${connection.source}-${connection.target}`;

      // Check if this edge already exists
      const edgeExists = edges.some((e) => e.id === edgeId);
      if (edgeExists) return;

      // Find source and target nodes to apply connection rules
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      // Implement connection rules based on the conversation flow requirements
      if (sourceNode && targetNode) {
        // Rule 1: Greeting nodes can only connect to Question or Information nodes
        if (
          sourceNode.type === 'greeting' &&
          !['question', 'information'].includes(targetNode.type)
        ) {
          return;
        }

        // Rule 2: Question nodes should connect to Information nodes for responses
        if (
          sourceNode.type === 'question' &&
          targetNode.type !== 'information'
        ) {
          return;
        }

        // Rule 3: Information nodes can connect to Question nodes (for follow-ups)
        if (
          sourceNode.type === 'information' &&
          targetNode.type !== 'question'
        ) {
          return;
        }
      }

      // Add the edge with proper styling based on node types
      setEdges((prevEdges) =>
        addEdge(
          {
            ...connection,
            id: edgeId,
            animated: true,
            style: {
              stroke: getConnectionColor(sourceNode?.type),
              strokeWidth: 2
            },
            label: getConnectionLabel(sourceNode?.type, targetNode?.type)
          },
          prevEdges
        )
      );
    },
    [edges, nodes, setEdges]
  );

  // Helper functions to determine edge styles based on node types
  const getConnectionColor = (sourceType?: string): string => {
    switch (sourceType) {
      case 'greeting':
        return '#3b82f6'; // blue
      case 'question':
        return '#eab308'; // yellow
      case 'information':
        return '#10b981'; // green
      default:
        return '#94a3b8'; // gray
    }
  };

  const getConnectionLabel = (
    sourceType?: string,
    targetType?: string
  ): string => {
    if (sourceType === 'question' && targetType === 'information') {
      return 'Response';
    }
    if (sourceType === 'greeting' && targetType === 'question') {
      return 'Next';
    }
    return '';
  };
  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance.current) return;

      const nodeType = event.dataTransfer.getData('application/reactflow') as
        | 'greeting'
        | 'question'
        | 'information';

      if (!nodeType) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.current.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });

      addNode(nodeType, position);
    },
    [addNode]
  );

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            animated: true,
            type: 'smoothstep',
            style: { strokeWidth: 2 }
          }}
          fitView
          className="bg-slate-50"
        >
          <Controls className="rounded-md border border-gray-200 bg-white shadow-md" />
          <Background gap={16} color="#94a3b8" size={1} />

          <Panel position="top-left" className="m-4">
            <NodePalette />
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default FlowCanvas;
