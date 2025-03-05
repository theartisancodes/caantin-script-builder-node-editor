'use client';

import { Suspense } from 'react';
import CreateWorkflowDialog from '@/app/(root)/workflows/_components/CreateWorkflowDialog';
import UserWorkflows from '@/app/(root)/workflows/_components/UserWorkflows';
import UserWorkflowSkeleton from '@/app/(root)/workflows/_components/UserWorkflowSkeleton';

function Page() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className="h-full py-6">
        <UserWorkflows />
      </div>
    </div>
  );
}

export default Page;
