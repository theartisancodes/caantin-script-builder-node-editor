'use client';

import NodePropertiesPanel from '../../../components/script-builder/NodeProperties';

export default function NodeEditor() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Script Builder</h1>
      <p className="mb-8 text-muted-foreground">
        Design your conversation flow by configuring different types of nodes
        below.
      </p>
      <NodePropertiesPanel />
    </div>
  );
}
