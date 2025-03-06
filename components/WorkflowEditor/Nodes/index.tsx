'use client';

import { useTheme } from 'next-themes';
import { Handle, Position } from 'reactflow';
import { flowColors, nodeConfig } from '@/constants';
import { NodeType } from '@/types';

interface DynamicNodeProps {
  data: {
    message?: string;
    question?: string;
    options?: string[];
    condition?: string;
    title?: string;
    content?: string;
    operation?: string;
    entity?: string;
    details?: string;
    destination?: string;
    isDark?: boolean;
  };
  type: NodeType;
}

const Node = ({ data, type }: DynamicNodeProps) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const config = nodeConfig[type];
  const IconComponent = config.icon;
  const colors = flowColors[type] || flowColors.greeting;

  const colorClasses = isDark
    ? `${config.color.dark.border} ${config.color.dark.bg}`
    : `${config.color.light.border} ${config.color.light.bg}`;

  const optionColorClasses = isDark
    ? `${hasOptionalColors(config.color.dark) ? config.color.dark.optionBorder : ''}
       ${hasOptionalColors(config.color.dark) ? config.color.dark.optionBg : ''}`
    : `${hasOptionalColors(config.color.light) ? config.color.light.optionBorder : ''}
       ${hasOptionalColors(config.color.light) ? config.color.light.optionBg : ''}`;

  const codeColorClass = isDark
    ? hasCodeBg(config.color.dark)
      ? config.color.dark.codeBg
      : ''
    : hasCodeBg(config.color.light)
      ? config.color.light.codeBg
      : '';

  const getHandleStyle = () => ({
    background: isDark ? colors.dark.handle : colors.light.handle,
    width: 6,
    height: 6,
    border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`
  });

  return (
    <div
      className={`w-48 max-w-full rounded-md border-[1.5px] px-3 py-2 text-sm shadow-sm sm:w-52 md:w-56 lg:w-60 ${colorClasses}`}
    >
      <Handle type="target" position={Position.Top} style={getHandleStyle()} />

      <div className="flex items-center gap-1">
        <IconComponent size={14} />
        <div className="text-xs font-medium sm:text-sm">{config.label}</div>
      </div>

      <div className="mt-1 text-xs sm:text-sm">
        {(type === 'greeting' || type === 'information') && (
          <div className="line-clamp-3 text-foreground">{data.message}</div>
        )}
        {type === 'question' && (
          <>
            <div className="mb-1 line-clamp-2 text-foreground">
              {data.question}
            </div>
            <div className="space-y-0.5">
              {data.options?.map((option, index) => (
                <div
                  key={index}
                  className={`rounded border px-1.5 py-0.5 text-xs text-foreground ${optionColorClasses}`}
                >
                  {option}
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`option-${index}`}
                    style={{
                      ...getHandleStyle(),
                      top: `${50 + index * 18}%`
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {type === 'decision' && (
          <>
            <div className="mb-1 line-clamp-2 text-foreground">
              {data.condition}
            </div>
            <div className="space-y-0.5">
              {data.options?.map((option, index) => (
                <div
                  key={index}
                  className={`rounded border px-1.5 py-0.5 text-xs text-foreground ${optionColorClasses}`}
                >
                  {option}
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`option-${index}`}
                    style={{
                      ...getHandleStyle(),
                      top: `${50 + index * 18}%`
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {type === 'knowledge' && (
          <>
            <div className="mb-0.5 line-clamp-1 font-medium text-foreground">
              {data.title}
            </div>
            <div className="line-clamp-3 text-foreground">{data.content}</div>
          </>
        )}
        {type === 'database' && (
          <>
            <div className="mb-0.5 line-clamp-1 font-medium text-foreground">
              {data.operation}: {data.entity}
            </div>
            <div
              className={`line-clamp-2 rounded p-1 font-mono text-[10px] text-foreground ${codeColorClass}`}
            >
              {data.details}
            </div>
          </>
        )}
        {type === 'transfer' && (
          <>
            <div className="mb-0.5 line-clamp-1 font-medium text-foreground">
              To: {data.destination}
            </div>
            <div className="line-clamp-2 text-foreground">{data.message}</div>
          </>
        )}
      </div>

      {(type === 'greeting' ||
        type === 'information' ||
        type === 'knowledge' ||
        type === 'database' ||
        type === 'transfer') && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={getHandleStyle()}
        />
      )}
    </div>
  );
};

function hasOptionalColors(
  colorObj: any
): colorObj is { optionBorder: string; optionBg: string } {
  return colorObj && 'optionBorder' in colorObj && 'optionBg' in colorObj;
}

function hasCodeBg(colorObj: any): colorObj is { codeBg: string } {
  return colorObj && 'codeBg' in colorObj;
}

export default Node;
