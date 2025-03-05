// app/(root)/workflows/page.tsx
import React from 'react';
import WorkflowEditor from '@/components/WorkflowEditor';

const Workflow = () => {
  return (
    <div className="h-[80%]">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold">Workflow Editor</h1>
      </div>
      <WorkflowEditor />
    </div>
  );
};

export default Workflow;
