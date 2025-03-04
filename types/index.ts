export type NodeType = 'greeting' | 'question' | 'information';

export interface NodeData {
  label: string;
  message?: string;
  question?: string;
  options?: string[];
}

export interface Node {
  id: string;
  type: NodeType;
  data: NodeData;
  position: { x: number; y: number };
}
