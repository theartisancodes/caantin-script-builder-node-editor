'use client';

import { ReactNode, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/form';
import { Input } from '@ui/input';
import { CopyIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useWorkflowStore, Workflow } from '@/store';

const duplicateWorkflowSchema = z.object({
  name: z.string().min(1, 'Workflow name is required')
});

type DuplicateWorkflowSchemaType = z.infer<typeof duplicateWorkflowSchema>;

interface Props {
  workflow: Workflow;
  children: ReactNode;
}

function DuplicateWorkflowDialog({ workflow, children }: Props) {
  const [open, setOpen] = useState(false);
  const addWorkflow = useWorkflowStore((state) => state.addWorkflow);

  const form = useForm<DuplicateWorkflowSchemaType>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      name: `${workflow.name} (copy)`
    }
  });

  const onSubmit = (values: DuplicateWorkflowSchemaType) => {
    toast.loading('Duplicating workflow...', { id: 'duplicate-workflow' });

    try {
      // Simulate async operation
      setTimeout(() => {
        addWorkflow(values.name, workflow.description);
        setOpen(false);
        form.reset();
        toast.success('Workflow duplicated', { id: 'duplicate-workflow' });
      }, 500);
    } catch (error) {
      toast.error('Failed to duplicate workflow', { id: 'duplicate-workflow' });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={CopyIcon}
          title="Duplicate workflow"
          subTitle="Create a copy of this workflow"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="w-full space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Name <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name for the duplicated
                      workflow
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Duplicate
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DuplicateWorkflowDialog;
