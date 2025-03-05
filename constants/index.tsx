import {
  ArrowRightCircle,
  BookOpen,
  Database,
  GitBranch,
  HelpCircle,
  Info,
  MessageCircle
} from 'lucide-react';

export const sidebarLinks = [
  {
    imgURL: '/icons/home-white.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/icons/script-builder.svg',
    route: '/workflows',
    label: 'Workflows'
  },
  {
    imgURL: '/icons/pathfinder-white.svg',
    route: '#',
    label: 'Pathfinder'
  },
  {
    imgURL: '/icons/account-white.svg',
    route: '#1',
    label: 'Account'
  }
];

export const nodeConfig = {
  greeting: {
    icon: MessageCircle,
    color: {
      light: {
        border: 'border-blue-500',
        bg: 'bg-blue-50'
      },
      dark: {
        border: 'border-blue-600',
        bg: 'bg-blue-950/50'
      }
    },
    label: 'Greeting'
  },
  question: {
    icon: HelpCircle,
    color: {
      light: {
        border: 'border-green-500',
        bg: 'bg-green-50',
        optionBorder: 'border-green-200',
        optionBg: 'bg-white'
      },
      dark: {
        border: 'border-green-600',
        bg: 'bg-green-950/50',
        optionBorder: 'border-green-800',
        optionBg: 'bg-green-900/30'
      }
    },
    label: 'Question'
  },
  information: {
    icon: Info,
    color: {
      light: {
        border: 'border-amber-500',
        bg: 'bg-amber-50'
      },
      dark: {
        border: 'border-amber-600',
        bg: 'bg-amber-950/50'
      }
    },
    label: 'Information'
  },
  decision: {
    icon: GitBranch,
    color: {
      light: {
        border: 'border-purple-500',
        bg: 'bg-purple-50',
        optionBorder: 'border-purple-200',
        optionBg: 'bg-white'
      },
      dark: {
        border: 'border-purple-600',
        bg: 'bg-purple-950/50',
        optionBorder: 'border-purple-800',
        optionBg: 'bg-purple-900/30'
      }
    },
    label: 'Decision'
  },
  knowledge: {
    icon: BookOpen,
    color: {
      light: {
        border: 'border-indigo-500',
        bg: 'bg-indigo-50'
      },
      dark: {
        border: 'border-indigo-600',
        bg: 'bg-indigo-950/50'
      }
    },
    label: 'Knowledge'
  },
  database: {
    icon: Database,
    color: {
      light: {
        border: 'border-cyan-500',
        bg: 'bg-cyan-50',
        codeBg: 'bg-slate-100'
      },
      dark: {
        border: 'border-cyan-600',
        bg: 'bg-cyan-950/50',
        codeBg: 'bg-slate-800'
      }
    },
    label: 'Database'
  },
  transfer: {
    icon: ArrowRightCircle,
    color: {
      light: {
        border: 'border-rose-500',
        bg: 'bg-rose-50'
      },
      dark: {
        border: 'border-rose-600',
        bg: 'bg-rose-950/50'
      }
    },
    label: 'Transfer'
  }
};

export const defaultNodeData = {
  greeting: {
    message:
      "Hello, I'm calling from Caantin AI. Do you have a moment to discuss your business needs?"
  },
  question: {
    question: 'Are you currently using any AI solutions in your business?',
    options: ['Yes', 'No', 'Not sure']
  },
  information: {
    message:
      'Great! We have solutions that can complement your existing AI implementations.'
  },
  decision: {
    condition: 'Based on client budget considerations:',
    options: [
      'High budget (>$50k)',
      'Medium budget ($10k-$50k)',
      'Low budget (<$10k)'
    ]
  },
  knowledge: {
    title: 'AI Implementation Costs',
    content:
      'Enterprise AI solutions typically require significant investment in infrastructure, data preparation, model training, and ongoing maintenance.'
  },
  database: {
    operation: 'Query',
    entity: 'Clients',
    details:
      'SELECT name, industry, last_contact FROM clients WHERE ai_interest = true'
  },
  transfer: {
    destination: 'Technical Solutions Team',
    message:
      'This client requires specialized technical consultation about machine learning model implementation.'
  }
};

export const flowColors = {
  greeting: {
    light: {
      border: '#3b82f6', // blue-500
      background: '#eff6ff', // blue-50
      handle: '#2563eb', // blue-600
      edge: '#93c5fd' // blue-300
    },
    dark: {
      border: '#2563eb', // blue-600
      background: '#172554', // blue-950/50
      handle: '#3b82f6', // blue-500
      edge: '#1d4ed8' // blue-700
    }
  },
  question: {
    light: {
      border: '#22c55e', // green-500
      background: '#f0fdf4', // green-50
      handle: '#16a34a', // green-600
      edge: '#86efac' // green-300
    },
    dark: {
      border: '#16a34a', // green-600
      background: '#14532d', // green-950/50
      handle: '#22c55e', // green-500
      edge: '#15803d' // green-700
    }
  },
  information: {
    light: {
      border: '#f59e0b', // amber-500
      background: '#fffbeb', // amber-50
      handle: '#d97706', // amber-600
      edge: '#fcd34d' // amber-300
    },
    dark: {
      border: '#d97706', // amber-600
      background: '#78350f', // amber-950/50
      handle: '#f59e0b', // amber-500
      edge: '#b45309' // amber-700
    }
  },
  decision: {
    light: {
      border: '#a855f7', // purple-500
      background: '#f5f3ff', // purple-50
      handle: '#9333ea', // purple-600
      edge: '#d8b4fe' // purple-300
    },
    dark: {
      border: '#9333ea', // purple-600
      background: '#4c1d95', // purple-950/50
      handle: '#a855f7', // purple-500
      edge: '#7e22ce' // purple-700
    }
  },
  knowledge: {
    light: {
      border: '#6366f1', // indigo-500
      background: '#eef2ff', // indigo-50
      handle: '#4f46e5', // indigo-600
      edge: '#a5b4fc' // indigo-300
    },
    dark: {
      border: '#4f46e5', // indigo-600
      background: '#312e81', // indigo-950/50
      handle: '#6366f1', // indigo-500
      edge: '#4338ca' // indigo-700
    }
  },
  database: {
    light: {
      border: '#06b6d4', // cyan-500
      background: '#ecfeff', // cyan-50
      handle: '#0891b2', // cyan-600
      edge: '#67e8f9' // cyan-300
    },
    dark: {
      border: '#0891b2', // cyan-600
      background: '#164e63', // cyan-950/50
      handle: '#06b6d4', // cyan-500
      edge: '#0e7490' // cyan-700
    }
  },
  transfer: {
    light: {
      border: '#f43f5e', // rose-500
      background: '#fff1f2', // rose-50
      handle: '#e11d48', // rose-600
      edge: '#fda4af' // rose-300
    },
    dark: {
      border: '#e11d48', // rose-600
      background: '#881337', // rose-950/50
      handle: '#f43f5e', // rose-500
      edge: '#be123c' // rose-700
    }
  }
};
