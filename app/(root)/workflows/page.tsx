import React from 'react';
import WorkflowEditor from '@/components/WorkflowEditor';

const Workflow = () => {
  return (
    <div className="h-[85%]">
      <div className="rounded-md border-b p-4">
        <h1 className="text-xl font-bold">Workflow Editor</h1>
      </div>
      <WorkflowEditor />
    </div>
  );
};

export default Workflow;
