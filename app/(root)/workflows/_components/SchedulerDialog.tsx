'use client';

import { useEffect, useState } from 'react';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import parser from 'cron-parser';
import cronstrue from 'cronstrue';
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react';
import { toast } from 'sonner';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useWorkflowStore } from '@/store';

function SchedulerDialog({
  workflowId,
  workflowCron
}: {
  workflowId: string;
  workflowCron: string | null;
}) {
  const [cron, setCron] = useState(workflowCron || '');
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const updateWorkflow = useWorkflowStore((state) => state.updateWorkflow);

  useEffect(() => {
    try {
      const cronString = cronstrue.toString(cron);
      parser?.parseExpression(cron);
      setValidCron(true);
      setReadableCron(cronString);
    } catch (error: any) {
      setValidCron(false);
    }
  }, [cron]);

  const hasValidCron = workflowCron && workflowCron.length > 0;
  const readableWorkflowCron = hasValidCron && cronstrue.toString(workflowCron);

  const updateSchedule = () => {
    if (!validCron || !cron) return;

    setIsProcessing(true);
    toast.loading('Saving schedule...', { id: 'cron' });

    // Simulate async operation
    setTimeout(() => {
      try {
        updateWorkflow(workflowId, { cron });
        toast.success('Schedule updated successfully', { id: 'cron' });
        setIsProcessing(false);
      } catch (error) {
        toast.error('Failed to update schedule', { id: 'cron' });
        setIsProcessing(false);
      }
    }, 500);
  };

  const removeSchedule = () => {
    setIsProcessing(true);
    toast.loading('Removing schedule...', { id: 'cron' });

    // Simulate async operation
    setTimeout(() => {
      try {
        updateWorkflow(workflowId, { cron: null });
        toast.success('Schedule removed successfully', { id: 'cron' });
        setIsProcessing(false);
      } catch (error) {
        toast.error('Failed to remove schedule', { id: 'cron' });
        setIsProcessing(false);
      }
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'link'}
          size={'sm'}
          className={cn(
            'h-auto p-0 text-sm text-orange-400',
            hasValidCron && 'text-primary'
          )}
        >
          {hasValidCron ? (
            <div className="flex items-center gap-2">
              <ClockIcon />
              {readableWorkflowCron}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="mr-1 h-3 w-3" />
              Set Schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="space-y-4 p-6">
          <p className="text-sm text-muted-foreground">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC
          </p>
          <Input
            placeholder="E.g. * * * * *"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />
          {cron && (
            <div
              className={cn(
                'rounded-md border border-destructive bg-accent p-4 text-sm text-destructive',
                validCron && 'border-primary text-primary'
              )}
            >
              {validCron ? readableCron : 'Not a valid cron expression'}
            </div>
          )}
        </div>
        {validCron && (
          <DialogClose asChild>
            <div className="px-8">
              <Button
                className="w-full border-destructive text-destructive hover:text-destructive"
                variant={'outline'}
                disabled={isProcessing}
                onClick={removeSchedule}
              >
                Remove current schedule
              </Button>
              <Separator className="my-4" />
            </div>
          </DialogClose>
        )}
        <DialogFooter className="gap-2 px-6">
          <DialogClose asChild>
            <Button className="w-full" variant={'secondary'}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={!validCron || isProcessing || !cron}
              onClick={updateSchedule}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SchedulerDialog;
