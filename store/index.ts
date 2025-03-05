'use client';

import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { WorkflowExecutionStatus, WorkflowStatus } from '@/types';

export type Workflow = {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  cron: string | null;
  creditsCost?: number;
  createdAt: Date;
  updatedAt: Date;
  lastRunAt?: Date | null;
  lastRunStatus?: WorkflowExecutionStatus | null;
  lastRunId?: string | null;
  nextRunAt?: Date | null;
};

type WorkflowStore = {
  workflows: Workflow[];
  loading: boolean;
  error: boolean;
  fetchWorkflows: () => Promise<void>;
  addWorkflow: (name: string, description?: string) => string;
  updateWorkflow: (id: string, data: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  duplicateWorkflow: (id: string, newName: string) => void;
  runWorkflow: (id: string) => void;
};

// Mock data
const mockWorkflows: Workflow[] = [
  {
    id: 'mock-1',
    name: 'Email Campaign Flow',
    description: 'Automatically send emails based on user behavior',
    status: WorkflowStatus.PUBLISHED,
    cron: '0 9 * * 1',
    creditsCost: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRunAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    lastRunStatus: WorkflowExecutionStatus.COMPLETED,
    lastRunId: 'run-1',
    nextRunAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'mock-2',
    name: 'Lead Generation Workflow',
    description: 'Draft workflow for generating leads',
    status: WorkflowStatus.DRAFT,
    cron: null,
    creditsCost: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const useWorkflowStore = create<WorkflowStore>()((set, get) => ({
  workflows: [],
  loading: false,
  error: false,

  fetchWorkflows: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ workflows: mockWorkflows, loading: false });
    } catch (error) {
      set({ error: true, loading: false });
    }
  },

  addWorkflow: (name, description) => {
    const newWorkflow: Workflow = {
      id: uuidv4(),
      name,
      description,
      status: WorkflowStatus.DRAFT,
      cron: null,
      creditsCost: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    set((state) => ({
      workflows: [...state.workflows, newWorkflow]
    }));

    return newWorkflow.id;
  },

  updateWorkflow: (id, data) => {
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === id
          ? { ...workflow, ...data, updatedAt: new Date() }
          : workflow
      )
    }));
  },

  deleteWorkflow: (id) => {
    set((state) => ({
      workflows: state.workflows.filter((workflow) => workflow.id !== id)
    }));
  },

  duplicateWorkflow: (id, newName) => {
    const workflow = get().workflows.find((wf) => wf.id === id);
    if (!workflow) return;

    const newWorkflow: Workflow = {
      ...workflow,
      id: uuidv4(),
      name: newName,
      status: WorkflowStatus.DRAFT,
      cron: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastRunAt: null,
      lastRunStatus: null,
      lastRunId: null,
      nextRunAt: null
    };

    set((state) => ({
      workflows: [...state.workflows, newWorkflow]
    }));
  },

  runWorkflow: (id) => {
    toast.loading('Running workflow...', { id: 'run-workflow' });

    setTimeout(() => {
      const runId = uuidv4();
      set((state) => ({
        workflows: state.workflows.map((workflow) =>
          workflow.id === id
            ? {
                ...workflow,
                lastRunAt: new Date(),
                lastRunId: runId,
                lastRunStatus: WorkflowExecutionStatus.COMPLETED
              }
            : workflow
        )
      }));
      toast.success('Workflow completed successfully', { id: 'run-workflow' });
    }, 2000);
  }
}));
