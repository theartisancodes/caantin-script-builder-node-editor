'use client';

import { ChangeEvent } from 'react';
import { GreetingNode } from '@/types';

interface GreetingNodeFormProps {
  data: GreetingNode['data'];
  onChange: (_: Partial<GreetingNode['data']>) => void;
}

const GreetingNodeForm = ({ data, onChange }: GreetingNodeFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ message: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="greeting-message"
          className="mb-1 block text-sm font-medium"
        >
          Greeting Message
        </label>
        <textarea
          id="greeting-message"
          className="h-32 w-full rounded-md border bg-background p-2"
          value={data.message}
          onChange={handleChange}
          placeholder="Enter your greeting message..."
          required
        />
      </div>
    </div>
  );
};

export default GreetingNodeForm;
