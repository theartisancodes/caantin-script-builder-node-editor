// store/index.ts
import { nanoid } from 'nanoid';
import { Edge, Node, XYPosition } from 'reactflow';
import { create } from 'zustand';

type NodeType = 'greeting' | 'question' | 'information';

interface NodeData {
  label: string;
  message?: string;
  question?: string;
  options?: string[];
}

interface NodeStore {
  nodes: Node<NodeData>[];
  edges: Edge[];
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (type: NodeType, position?: XYPosition) => void;
  updateNode: (id: string, data: Partial<NodeData>) => void;
  deleteNode: (id: string) => void;
}

export const useNodeStore = create<NodeStore>((set) => ({
  nodes: [
    {
      id: '1',
      type: 'greeting',
      position: { x: 100, y: 50 },
      data: {
        label: 'Welcome Message',
        message: 'Hello! Welcome to Caantin AI.'
      }
    },
    {
      id: '2',
      type: 'question',
      position: { x: 300, y: 200 },
      data: {
        label: 'AI Usage',
        question: 'Are you using AI in your business?',
        options: ['Yes', 'No', 'Not sure']
      }
    }
  ],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (type, position = { x: 250, y: 250 }) =>
    set((state) => {
      const defaultData: Record<NodeType, NodeData> = {
        greeting: {
          label: 'New Greeting',
          message: 'Hello, welcome to our service!'
        },
        question: {
          label: 'New Question',
          question: 'What would you like to know?',
          options: ['Option 1', 'Option 2']
        },
        information: {
          label: 'New Information',
          message: 'Here is some important information.'
        }
      };

      return {
        nodes: [
          ...state.nodes,
          {
            id: nanoid(),
            type,
            position,
            data: defaultData[type]
          }
        ]
      };
    }),
  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    })),
  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      )
    }))
}));
