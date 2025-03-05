'use client';

import { Button } from '@ui/button';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

function RunButton({ workflowId }: { workflowId: string }) {
  return (
    <Button
      variant={'outline'}
      size={'sm'}
      className="flex items-center gap-2"
      onClick={() => toast.success('Success')}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  );
}

export default RunButton;
