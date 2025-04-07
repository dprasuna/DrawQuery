import { create } from "zustand";
import {
  Edge,
  Node,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "reactflow";

export type ColumnType =
  | "varchar"
  | "text"
  | "integer"
  | "float"
  | "boolean"
  | "date"
  | "datetime"
  | "time"
  | "uuid"
  | "json"
  | "bigint";

export interface Column {
  id: string;
  name: string;
  type: ColumnType;
  length?: number;
  nullable: boolean;
  primaryKey: boolean;
  unique: boolean;
  defaultValue?: string;
}

export interface TableData {
  name: string;
  columns: Column[];
}

export interface TableNode extends Node {
  data: TableData;
  type?: "tableNode";
}

export interface SchemaState {
  nodes: TableNode[];
  edges: Edge[];
  setNodes: (nodes: TableNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addTable: (table: TableData) => void;
  updateTable: (id: string, data: Partial<TableData>) => void;
  addColumn: (tableId: string, column: Column) => void;
  updateColumn: (tableId: string, columnId: string, data: Partial<Column>) => void;
  removeColumn: (tableId: string, columnId: string) => void;
  removeTable: (id: string) => void;
  getTableById: (id: string) => TableNode | undefined;
  resetSchema : () => void;
}

const loadLocalStorage = () => {
  try {
    const savedData = localStorage.getItem("dbize-schema");
    return savedData ? JSON.parse(savedData) : { nodes: [], edges: [] };
  } catch {
    return { nodes: [], edges: [] };
  }
};

const saveToLocalStorage = (state: { nodes: Node[]; edges: Edge[] }) => {
  try {
    localStorage.setItem(
      "dbize-schema",
      JSON.stringify({
        nodes: state.nodes,
        edges: state.edges,
      }),
    );
  } catch (error) {
    console.error("Failed to save to localStorage : ", error);
  }
};

export const useSchemaStore = create<SchemaState>((set, get) => {
  const initialState = loadLocalStorage();
  const saveCurrentState = () => {
    saveToLocalStorage({
      nodes: get().nodes,
      edges: get().edges,
    });
  };

  return {
    nodes: initialState.nodes,
    edges: initialState.edges,

    setNodes: (nodes) => {
      set({ nodes });
      saveToLocalStorage({ nodes, edges: get().edges });
    },

    setEdges: (edges) => {
      set({ edges });
      saveToLocalStorage({ nodes: get().nodes, edges });
    },

    onNodesChange: (changes) => {
      set((state) => {
        const newNodes = applyNodeChanges(changes, state.nodes) as TableNode[];
        saveToLocalStorage({ nodes: newNodes, edges: state.edges });
        return { nodes: newNodes };
      });
    },

    onEdgesChange: (changes) => {
      set((state) => {
        const newEdges = applyEdgeChanges(changes, state.edges);
        saveToLocalStorage({ nodes: state.nodes, edges: newEdges });
        return { edges: newEdges };
      });
    },

    onConnect: (connection) => {
      set((state) => {
        const newEdges = addEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#374151" },
          },
          state.edges,
        );
        saveToLocalStorage({ nodes: state.nodes, edges: newEdges });
        return { edges: newEdges };
      });
    },

    addTable: (table) => {
      set((state) => {
        const newNode: TableNode = {
          id: `table-${Date.now()}`,
          type: "tableNode",
          position: { x: 250, y: 250 },
          data: table,
        };
        const newNodes = [...state.nodes, newNode];
        saveToLocalStorage({ nodes: newNodes, edges: state.edges });
        return { nodes: newNodes };
      });
    },

    updateTable: (id, data) => {
      set((state) => {
        const newNodes = state.nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
          }
          return node;
        });
        saveToLocalStorage({ nodes: newNodes, edges: state.edges });
        return { nodes: newNodes };
      });
    },

    addColumn: (tableId, column) => {
      set((state) => {
        const newNodes = state.nodes.map((node) => {
          if (node.id === tableId) {
            return {
              ...node,
              data: {
                ...node.data,
                columns: [...node.data.columns, column],
              },
            };
          }
          return node;
        });
        saveToLocalStorage({ nodes: newNodes, edges: state.edges });
        return { nodes: newNodes };
      });
    },

    updateColumn: (tableId, columnId, data) => {
      set((state) => {
        const newNodes = state.nodes.map((node) => {
          if (node.id === tableId) {
            return {
              ...node,
              data: {
                ...node.data,
                columns: node.data.columns.map((column) => {
                  if (column.id === columnId) {
                    return {
                      ...column,
                      ...data,
                    };
                  }
                  return column;
                }),
              },
            };
          }
          return node;
        });
        saveToLocalStorage({ nodes: newNodes, edges: state.edges });
        return { nodes: newNodes };
      });
    },

    removeColumn: (tableId, columnId) => {
      set((state) => {
        const newNodes = state.nodes.map((node) => {
          if (node.id === tableId) {
            return {
              ...node,
              data: {
                ...node.data,
                columns: node.data.columns.filter((column) => column.id !== columnId),
              },
            };
          }
          return node;
        });
        saveToLocalStorage({ nodes: newNodes, edges: state.edges });
        return { nodes: newNodes };
      });
    },

    removeTable: (id) => {
      set((state) => {
        const newNodes = state.nodes.filter((node) => node.id !== id);
        const newEdges = state.edges.filter((edge) => edge.source !== id && edge.target !== id);
        saveToLocalStorage({ nodes: newNodes, edges: newEdges });
        return { nodes: newNodes, edges: newEdges };
      });
    },

    getTableById: (id) => {
      return get().nodes.find((node) => node.id === id);
    },

    resetSchema: () => {
      if (
        window.confirm("Are you sure you want to reset your entire schema? This cannot be undone.")
      ) {
        set({ nodes: [], edges: [] });
        localStorage.removeItem("dbize-schema");
      }
    },
  };
});
