import React from 'react';
import {
  ArrowRightCircle,
  BookOpen,
  Database,
  GitBranch,
  HelpCircle,
  Info,
  MessageCircle
} from 'lucide-react';
import { NodeData, NodeType } from '@/types';

// Create a more comprehensive type that includes all possible properties
interface CompleteNodeData extends NodeData {
  // Add the missing properties
  condition?: string;
  title?: string;
  content?: string;
  operation?: string;
  entity?: string;
  details?: string;
  destination?: string;
}

const NodePreview: React.FC<{
  type: NodeType;
  data: CompleteNodeData;
}> = ({ type, data }) => {
  const isDark = data.isDark;

  const getNodeStyle = () => {
    switch (type) {
      case 'greeting':
        return {
          borderColor: isDark ? '#2563eb' : '#3b82f6',
          bgColor: isDark ? '#172554' : '#eff6ff',
          icon: <MessageCircle size={18} className="text-blue-500" />,
          label: 'Greeting'
        };
      case 'question':
        return {
          borderColor: isDark ? '#16a34a' : '#22c55e',
          bgColor: isDark ? '#14532d' : '#f0fdf4',
          icon: <HelpCircle size={18} className="text-green-500" />,
          label: 'Question'
        };
      case 'information':
        return {
          borderColor: isDark ? '#d97706' : '#f59e0b',
          bgColor: isDark ? '#78350f' : '#fffbeb',
          icon: <Info size={18} className="text-amber-500" />,
          label: 'Information'
        };
      case 'decision':
        return {
          borderColor: isDark ? '#9333ea' : '#a855f7',
          bgColor: isDark ? '#4c1d95' : '#f5f3ff',
          icon: <GitBranch size={18} className="text-purple-500" />,
          label: 'Decision'
        };
      case 'knowledge':
        return {
          borderColor: isDark ? '#4f46e5' : '#6366f1',
          bgColor: isDark ? '#312e81' : '#eef2ff',
          icon: <BookOpen size={18} className="text-indigo-500" />,
          label: 'Knowledge'
        };
      case 'database':
        return {
          borderColor: isDark ? '#0891b2' : '#06b6d4',
          bgColor: isDark ? '#164e63' : '#ecfeff',
          icon: <Database size={18} className="text-cyan-500" />,
          label: 'Database'
        };
      case 'transfer':
        return {
          borderColor: isDark ? '#e11d48' : '#f43f5e',
          bgColor: isDark ? '#881337' : '#fff1f2',
          icon: <ArrowRightCircle size={18} className="text-rose-500" />,
          label: 'Transfer'
        };
      default:
        return {
          borderColor: '#64748b',
          bgColor: '#f8fafc',
          icon: null,
          label: 'Node'
        };
    }
  };

  const style = getNodeStyle();
  const optionStyle = {
    borderColor: type === 'question' ? (isDark ? '#15803d' : '#bbf7d0') : '',
    bgColor: type === 'question' ? (isDark ? '#052e16' : '#f0fdf4') : ''
  };

  return (
    <div
      style={{
        borderColor: style.borderColor,
        backgroundColor: style.bgColor,
        width: '256px'
      }}
      className="rounded-md border-2 px-4 py-2 shadow-sm"
    >
      <div className="flex items-center gap-2">
        {style.icon}
        <div className="font-medium">{style.label}</div>
      </div>

      <div className="mt-2 text-sm">
        {(type === 'greeting' || type === 'information') && (
          <div className="text-foreground">{data.message}</div>
        )}

        {type === 'question' && (
          <>
            <div className="mb-1 text-foreground">{data.question}</div>
            <div className="space-y-1">
              {data.options?.map((option: string, index: number) => (
                <div
                  key={index}
                  style={{
                    borderColor: optionStyle.borderColor,
                    backgroundColor: optionStyle.bgColor
                  }}
                  className="rounded border px-2 py-1 text-foreground"
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}
        {type === 'decision' && (
          <>
            <div className="mb-1 text-foreground">{data.condition}</div>
            <div className="space-y-1">
              {data.options?.map((option: string, index: number) => (
                <div
                  key={index}
                  className="rounded border border-purple-300 bg-purple-50 px-2 py-1 text-foreground dark:border-purple-800 dark:bg-purple-950"
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}

        {type === 'knowledge' && (
          <>
            <div className="mb-1 font-medium text-foreground">{data.title}</div>
            <div className="text-foreground">{data.content}</div>
          </>
        )}

        {type === 'database' && (
          <>
            <div className="mb-1 font-medium text-foreground">
              {data.operation}: {data.entity}
            </div>
            <div className="rounded bg-slate-100 p-1 font-mono text-xs text-foreground dark:bg-slate-800">
              {data.details}
            </div>
          </>
        )}

        {type === 'transfer' && (
          <>
            <div className="mb-1 font-medium text-foreground">
              To: {data.destination}
            </div>
            <div className="text-foreground">{data.message}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default NodePreview;
