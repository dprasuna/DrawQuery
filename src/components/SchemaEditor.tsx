import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  Node,
  NodeTypes,
  MiniMap,
  Panel,
  ReactFlowInstance,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { useSchemaStore, TableNode } from "../store/schema-store";
import { TableNode as TableNodeComponent } from "./TableNode";
import { AddTableDialog } from "./AddTableDialog";
import { Button } from "./ui/button";
import { Download, ZoomIn, ZoomOut, Maximize2, Move, Trash2, Loader2, Check } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const nodeTypes: NodeTypes = {
  tableNode: TableNodeComponent,
};

// Extended interface to include toImage
interface ExtendedReactFlowInstance extends ReactFlowInstance {
  toImage: (options: {
    quality?: number;
    width?: number;
    height?: number;
    backgroundColor?: string;
  }) => string;
}

export const SchemaEditor = () => {
  const { theme } = useTheme();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useSchemaStore();

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  const fitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [reactFlowInstance]);

  useEffect(() => {
    if (reactFlowInstance && nodes.length) {
      // Fit view when nodes change (after a short delay to allow for animations)
      const timer = setTimeout(() => {
        fitView();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [nodes.length, reactFlowInstance, fitView]);

  const downloadImage = useCallback(() => {
    if (reactFlowInstance) {
      const instance = reactFlowInstance as unknown as ExtendedReactFlowInstance;
      const dataURL = instance.toImage({
        quality: 1,
        width: 1920,
        height: 1080,
        backgroundColor: "#f4f4f5",
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "db-schema.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [reactFlowInstance]);

  useEffect(() => {
    setSaveStatus("saving");
    const timer = setTimeout(() => setSaveStatus("saved"), 300);
    const hideTimer = setTimeout(() => setSaveStatus("idle"), 2000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [nodes, edges]);

  return (
    <div className="relative flex h-full flex-col">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={onInit}
          minZoom={0.1}
          maxZoom={2}
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: true,
            style: { stroke: theme === "dark" ? "#4ade80" : "#374151" },
          }}
          proOptions={{ hideAttribution: true }}
          className="bg-zinc-50 dark:bg-zinc-900"
        >
          <Background color="#99999930" gap={20} size={1} />
          {/* <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="!bg-white dark:!bg-zinc-800 !shadow-md !rounded-md !border-zinc-200 dark:!border-zinc-700"
          /> */}
          <Controls
            className="!rounded-md !border-zinc-200 !bg-white !shadow-md dark:!border-zinc-700 dark:!bg-zinc-800"
            showInteractive={false}
          />

          <Panel position="top-left" className="ml-2 mt-2">
            <div className="flex items-center gap-2">
              <AddTableDialog />
              <Button
                variant="outline"
                size="sm"
                onClick={downloadImage}
                className="flex items-center gap-1 bg-white dark:bg-zinc-800"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fitView}
                className="flex items-center gap-1 bg-white dark:bg-zinc-800"
              >
                <Maximize2 className="h-4 w-4" />
                Fit View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useSchemaStore.getState().resetSchema()}
                className="flex items-center gap-1 bg-white text-red-600 hover:text-red-700 dark:bg-zinc-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
                Reset Schema
              </Button>
            </div>
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
      <div className="absolute right-4 top-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        {saveStatus === "saving" && (
          <span className="flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Saving...
          </span>
        )}
        {saveStatus === "saved" && (
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Saved
          </span>
        )}
      </div>
    </div>
  );
};
