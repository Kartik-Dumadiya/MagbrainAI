import { create } from "zustand";
import { nanoid } from "nanoid";

const initialMetadata = { voice: "English", language: "English", globalPrompt: "" };
const initialNodes = [
  {
    id: "begin",
    type: "begin",
    position: { x: 100, y: 60 },
    data: {},
  },
];

export const useFlowDesignerStore = create((set, get) => ({
  nodes: initialNodes,
  edges: [],
  selectedNodeId: null,
  metadata: { ...initialMetadata },
  flowName: "Conversational Flow Agent",
  flowId: null,

  setNodes: (updater) =>
    set((state) => {
      const newNodes = typeof updater === "function" ? updater(state.nodes) : updater;
      // console.log("setNodes: Updated nodes:", newNodes);
      return { nodes: newNodes };
    }),
  setEdges: (updater) =>
    set((state) => {
      const newEdges = typeof updater === "function" ? updater(state.edges) : updater;
      // console.log("setEdges: Updated edges:", newEdges);
      return { edges: newEdges };
    }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) => (n.id === id ? { ...n, data } : n)),
    })),
  setMetadata: (metadata) => set({ metadata }),
  setFlowName: (name) => set({ flowName: name }),
  resetSelection: () => set({ selectedNodeId: null }),
  resetStore: () =>
    set({
      nodes: initialNodes,
      edges: [],
      selectedNodeId: null,
      metadata: { ...initialMetadata },
      flowName: "Untitled Agent",
      flowId: null,
    }),
  addNode: (type) => {
    console.log("addNode: Adding node of type:", type);
    const id = nanoid(8);
    let node = {
      id,
      type,
      position: { x: 250 + Math.random() * 80, y: 100 + Math.random() * 200 },
      data: {},
    };
    if (type === "conversation") node.data = { message: "", transitions: [] };
    if (type === "function") node.data = { functionName: "" };
    if (type === "logic") node.data = { conditions: [], elseTarget: "" };
    if (type === "ending") node.data = { label: "End Call" };
    console.log("addNode: New node:", node);
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
    console.log("addNode: Updated nodes:", get().nodes);
  },
  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : e.selectedNodeId,
    })),
  addEdge: (edge) =>
    set((state) => {
      if (state.edges.some((e) => e.source === edge.source && e.target === edge.target)) {
        console.log("addEdge: Duplicate edge ignored:", edge);
        return state;
      }
      console.log("addEdge: Adding edge:", edge);
      return { edges: [...state.edges, edge] };
    }),
  setAll: ({ nodes, edges, metadata, flowName, flowId }) =>
    set({
      nodes:
        nodes && Array.isArray(nodes) && nodes.length > 0
          ? nodes.map((n) => ({
              ...n,
              id: n.id,
              position:
                n.position && typeof n.position.x === "number" && typeof n.position.y === "number"
                  ? { ...n.position }
                  : { x: 100, y: 100 },
            }))
          : initialNodes,
      edges: edges && Array.isArray(edges) ? edges : [],
      metadata: metadata && Object.keys(metadata).length > 0 ? metadata : { ...initialMetadata },
      flowName: flowName || "Untitled Agent",
      flowId: flowId || null,
    }),
}));