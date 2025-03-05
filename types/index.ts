export type NodeType =
  | 'greeting'
  | 'question'
  | 'information'
  | 'decision'
  | 'knowledge'
  | 'database'
  | 'transfer';

export interface GreetingNode {
  id: string;
  type: 'greeting';
  data: {
    message: string;
  };
}

export interface QuestionNode {
  id: string;
  type: 'question';
  data: {
    question: string;
    options: string[];
  };
}

export interface InformationNode {
  id: string;
  type: 'information';
  data: {
    message: string;
  };
}
export interface DecisionNode {
  id: string;
  type: 'decision';
  data: {
    message: string;
  };
}
export interface KnowledgeNode {
  id: string;
  type: 'knowledge';
  data: {
    message: string;
  };
}
export interface DatabaseNode {
  id: string;
  type: 'database';
  data: {
    message: string;
  };
}
export interface TransferNode {
  id: string;
  type: 'transfer';
  data: {
    message: string;
  };
}

export type Node =
  | GreetingNode
  | QuestionNode
  | InformationNode
  | DecisionNode
  | KnowledgeNode
  | DatabaseNode
  | TransferNode;

export interface NodePropertiesPanelProps {
  node: Node;
  onUpdate: (_: any) => void;
}

export interface NodeData {
  message?: string;
  question?: string;
  options?: string[];
  isDark?: boolean;
}
