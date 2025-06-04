import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow
} from "reactflow";
import ConversationNode from "./NodeTypes/ConversationNode";
import FunctionNode from "./NodeTypes/FunctionNode";
import LogicSplitNode from "./NodeTypes/LogicSplitNode";
import EndingNode from "./NodeTypes/EndingNode";
import BeginNode from "./NodeTypes/BeginNode";
import { useFlowDesignerStore } from "../../store/flowDesignerStore";
import "reactflow/dist/style.css";

const nodeTypes = {
  conversation: ConversationNode,
  function: FunctionNode,
  logic: LogicSplitNode,
  ending: EndingNode,
  begin: BeginNode
};

function FlowCanvasInner() {
  const { nodes, edges, setNodes, setEdges, setSelectedNodeId, addEdge } = useFlowDesignerStore();
  const { fitView } = useReactFlow();
  const hasFitted = useRef(false);

  useEffect(() => {
    if (
      !hasFitted.current &&
      nodes &&
      nodes.length > 1 
    ) {
      fitView({ padding: 1 });
      hasFitted.current = true;
    }
  }, [nodes, fitView]);


  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      const edge = {
        id: `e-${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        animated: true,
      };
      addEdge(edge);
    },
    [addEdge]
  );

  const onNodeClick = useCallback(
    (_, node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  return (
    <div className="flex-1 h-full bg-gradient-to-br from-indigo-50 to-cyan-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 8 }}
        defaultEdgeOptions={{ animated: true }}
      >
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case "conversation": return "#ec4899";
              case "function": return "#64748b";
              case "logic": return "#2563eb";
              case "ending": return "#f43f5e";
              case "begin": return "#10b981";
              default: return "#6b7280";
            }
          }}
          nodeStrokeWidth={2}
          zoomable
          pannable
        />
        <Controls />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}