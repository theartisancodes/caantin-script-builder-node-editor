import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { templatesList } from '@/constants';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { WorkflowTemplate } from '@/types';

interface TemplatesPanelProps {
  onSelectTemplate: (_: WorkflowTemplate) => void;
}

const TemplatesPanel = ({ onSelectTemplate }: TemplatesPanelProps) => {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const fetchTemplates = () => {
      setLoading(true);
      setTimeout(() => {
        setTemplates(templatesList);
        setLoading(false);
      }, 800);
    };

    fetchTemplates();
  }, []);

  return (
    <div className="flex h-full flex-col p-4">
      <h3 className="mb-4 text-sm font-medium">Saved Templates</h3>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>
      ) : templates.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-sm text-muted-foreground">
            No templates found. Save a workflow to create templates.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-md border border-border p-3 hover:bg-muted/50"
            >
              <h4 className="font-medium">{template.name}</h4>
              {template.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {template.description}
                </p>
              )}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Created: {template.createdAt}
                </span>
                <Button
                  size="sm"
                  onClick={() => onSelectTemplate(template)}
                  className={`${
                    resolvedTheme === 'dark'
                      ? 'bg-primary-300 text-white hover:bg-primary-500'
                      : 'bg-primary-500 hover:bg-primary-300'
                  }`}
                >
                  Use
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesPanel;
