'use client';

import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeChange,
  useOnSelectionChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '@/components/custom-node';
import NodePropertiesPanel from '@/components/node-properties-panel';
import { Button } from '@/components/ui/button';
import { useNodeStore } from '@/store';

const nodeTypes = {
  greeting: CustomNode,
  question: CustomNode,
  information: CustomNode
};

export default function ScriptBuilder() {
  const { nodes, edges, setNodes, setEdges, addNode, deleteNode } =
    useNodeStore();
  const [selectedNode, setSelectedNode] = React.useState<any>(null);

  // Handle node selection
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  // Handle edge updates
  const onEdgesChange = (changes) => {
    setEdges(changes);
  };

  // Update nodes with proper handling
  const handleNodeUpdate = (updatedNode) => {
    setNodes(
      nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
  };

  return (
    <div className="grid h-screen grid-cols-3 gap-4 p-4">
      <div className="col-span-2 rounded-lg border bg-gray-50 p-4">
        <h2 className="mb-3 text-xl font-semibold">Conversation Flow</h2>

        <div className="mb-3 flex gap-2">
          <Button onClick={() => addNode('greeting')}>Add Greeting</Button>
          <Button onClick={() => addNode('question')}>Add Question</Button>
          <Button onClick={() => addNode('information')}>
            Add Information
          </Button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>

      <NodePropertiesPanel
        node={selectedNode}
        onUpdate={handleNodeUpdate}
        onDelete={deleteNode}
      />
    </div>
  );
}
