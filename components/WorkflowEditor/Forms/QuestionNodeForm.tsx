'use client';

import { KeyboardEvent, useState } from 'react';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Textarea } from '@ui/textarea';
import { Plus, X } from 'lucide-react';
import { QuestionNode } from '@/types';

interface QuestionNodeFormProps {
  data: QuestionNode['data'];
  onChange: (_: Partial<QuestionNode['data']>) => void;
}

const QuestionNodeForm = ({ data, onChange }: QuestionNodeFormProps) => {
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      onChange({ options: [...data.options, newOption.trim()] });
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...data.options];
    newOptions.splice(index, 1);
    onChange({ options: newOptions });
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newOption.trim()) {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="question-text">Question Text</Label>
        <Textarea
          id="question-text"
          className="mt-1"
          value={data.question}
          onChange={(e) => onChange({ question: e.target.value })}
          placeholder="Enter your question..."
          rows={3}
        />
      </div>

      <div>
        <Label>Options</Label>
        <div className="mt-2 space-y-2">
          {data.options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={option}
                onChange={(e) => {
                  const newOptions = [...data.options];
                  newOptions[index] = e.target.value;
                  onChange({ options: newOptions });
                }}
                placeholder={`Option ${index + 1}`}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveOption(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <Input
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="New option"
              className="flex-1"
              onKeyDown={handleKeyPress}
            />
            <Button
              size="icon"
              onClick={handleAddOption}
              disabled={!newOption.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {data.options.length === 0 && (
          <p className="mt-1 text-sm text-muted-foreground">
            Add at least one option
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionNodeForm;
