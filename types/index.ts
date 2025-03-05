export type NodeType = 'greeting' | 'question' | 'information';

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

export type Node = GreetingNode | QuestionNode | InformationNode;
