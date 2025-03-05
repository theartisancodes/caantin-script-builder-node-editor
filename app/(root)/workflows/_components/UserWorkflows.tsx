'use client';

import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@ui/alert';
import { AlertCircle, InboxIcon } from 'lucide-react';
import CreateWorkflowDialog from './CreateWorkflowDialog';
import UserWorkflowSkeleton from './UserWorkflowSkeleton';
import WorkflowCard from './WorkflowCard';
import { useWorkflowStore } from '@/store';

export default function UserWorkflows() {
  const [mounted, setMounted] = useState(false);

  // Always access the store, but only use its values after mounting
  const store = useWorkflowStore();

  useEffect(() => {
    setMounted(true);
    store.fetchWorkflows();
  }, []);

  // Show skeleton during SSR
  if (!mounted) {
    return <UserWorkflowSkeleton />;
  }

  if (store.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (store.loading) {
    return <UserWorkflowSkeleton />;
  }

  if (store.workflows.length === 0) {
    return (
      <div className="flex h-full flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggeredText="Create your first workflow" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {store.workflows.map((workflow) => (
        <WorkflowCard workflow={workflow} key={workflow.id} />
      ))}
    </div>
  );
}
