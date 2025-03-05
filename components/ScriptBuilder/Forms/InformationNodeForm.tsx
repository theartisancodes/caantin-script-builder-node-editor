'use client';

import { ChangeEvent } from 'react';
import { InformationNode } from '@/types';

interface InformationNodeFormProps {
  data: InformationNode['data'];
  onChange: (_: Partial<InformationNode['data']>) => void;
}

const InformationNodeForm = ({ data, onChange }: InformationNodeFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ message: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="info-message"
          className="mb-1 block text-sm font-medium"
        >
          Information Message
        </label>
        <textarea
          id="info-message"
          className="h-32 w-full rounded-md border bg-background p-2"
          value={data.message}
          onChange={handleChange}
          placeholder="Enter your information message..."
          required
        />
      </div>
    </div>
  );
};

export default InformationNodeForm;
