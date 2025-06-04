import React, { useEffect, useState } from "react";
import { useFlowDesignerStore } from "../../store/flowDesignerStore";
import { saveFlow, updateFlow } from "../../api/flowDesignerApi";
import { updateAgent } from "../../api/agentApi";
import { toast } from "react-toastify";

const voices = ["English", "Spanish", "French", "German"];
const languages = ["English", "Spanish", "French", "German"];

export default function NodeProperties({ agent }) {
  const {
    selectedNodeId,
    nodes,
    setNodeData,
    metadata,
    setMetadata,
    flowId,
    flowName,
    setFlowName,
    edges,
    resetSelection,
    deleteNode,
    resetStore,
  } = useFlowDesignerStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const [agentName, setAgentName] = useState(agent.name || flowName);

  const handleAgentNameChange = async (e) => {
    const newName =  e.target.value;
    setFlowName(newName); // local store (used for flow)
    setAgentName(newName); // local state for UX
    try {
      await updateAgent(agent.bot_id, { name: newName });
      // Optionally: toast.success("Agent name updated!");
    } catch (err) {
      toast.error("Failed to update agent name!");
      console.error("Error updating agent name:", err);
    }
  };
  useEffect(() => {
    // Initialize agent name from store
    setAgentName(agent.name || flowName);
    handleAgentNameChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Handlers for saving the flow
  const handleSave = async () => {
    const payload = {
      name: flowName,
      nodes,
      edges,
      metadata,
      agentId: agent.bot_id, // Include agentId
    };
    try {
      if (flowId) {
        await updateFlow(flowId, payload);
        toast.success("Flow updated!");
      } else {
        const res = await saveFlow(payload);
        // Update flowId in store after creating new flow
        useFlowDesignerStore.setState({ flowId: res.data.flow._id });
        toast.success("Flow saved!");
      }
    } catch (err) {
      toast.error("Error saving flow!");
      console.error("Error saving flow:", err);
    }
  };

  // Node-specific forms
  function renderNodeForm() {
    if (!selectedNode) return null;
    switch (selectedNode.type) {
      case "conversation":
        return (
          <div>
            <label className="font-semibold text-pink-600 mb-1 block">Bot Message</label>
            <textarea
              className="w-full border rounded-lg p-2 min-h-[72px] bg-pink-50"
              value={selectedNode.data.message || ""}
              onChange={(e) =>
                setNodeData(selectedNode.id, { ...selectedNode.data, message: e.target.value })
              }
            />
            <div className="mt-4 font-semibold text-pink-600">Transitions</div>
            {selectedNode.data.transitions?.map((t, idx) => (
              <div key={idx} className="flex items-center gap-2 my-1">
                <input
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  value={t}
                  onChange={(e) => {
                    const arr = [...(selectedNode.data.transitions || [])];
                    arr[idx] = e.target.value;
                    setNodeData(selectedNode.id, { ...selectedNode.data, transitions: arr });
                  }}
                />
                <button
                  className="text-red-500 px-2"
                  onClick={() => {
                    const arr = (selectedNode.data.transitions || []).filter((_, i) => i !== idx);
                    setNodeData(selectedNode.id, { ...selectedNode.data, transitions: arr });
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className="text-blue-600 text-sm mt-1"
              onClick={() =>
                setNodeData(selectedNode.id, {
                  ...selectedNode.data,
                  transitions: [...(selectedNode.data.transitions || []), ""],
                })
              }
            >
              + Add Transition
            </button>
          </div>
        );
      case "function":
        return (
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">Function Name</label>
            <input
              className="w-full border rounded-lg p-2 bg-gray-50"
              value={selectedNode.data.functionName || ""}
              onChange={(e) =>
                setNodeData(selectedNode.id, { ...selectedNode.data, functionName: e.target.value })
              }
            />
          </div>
        );
      case "logic":
        return (
          <div>
            <div className="font-semibold text-blue-700 mb-1">Conditions</div>
            {selectedNode.data.conditions?.map((c, idx) => (
              <div key={idx} className="flex items-center gap-2 my-1">
                <input
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  value={c}
                  placeholder="Condition"
                  onChange={(e) => {
                    const arr = [...(selectedNode.data.conditions || [])];
                    arr[idx] = e.target.value;
                    setNodeData(selectedNode.id, { ...selectedNode.data, conditions: arr });
                  }}
                />
                <button
                  className="text-red-500 px-2"
                  onClick={() => {
                    const arr = (selectedNode.data.conditions || []).filter((_, i) => i !== idx);
                    setNodeData(selectedNode.id, { ...selectedNode.data, conditions: arr });
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className="text-blue-600 text-sm mt-1"
              onClick={() =>
                setNodeData(selectedNode.id, {
                  ...selectedNode.data,
                  conditions: [...(selectedNode.data.conditions || []), ""],
                })
              }
            >
              + Add Condition
            </button>
            <div className="mt-4 font-semibold text-blue-700">Else Target Node ID</div>
            <input
              className="w-full border rounded px-2 py-1 bg-blue-50 mt-1"
              value={selectedNode.data.elseTarget || ""}
              onChange={(e) =>
                setNodeData(selectedNode.id, { ...selectedNode.data, elseTarget: e.target.value })
              }
            />
          </div>
        );
      case "ending":
        return (
          <div>
            <label className="font-semibold text-red-700 mb-1 block">Label</label>
            <input
              className="w-full border rounded-lg p-2 bg-rose-50"
              value={selectedNode.data.label || ""}
              onChange={(e) =>
                setNodeData(selectedNode.id, { ...selectedNode.data, label: e.target.value })
              }
            />
          </div>
        );
      default:
        return null;
    }
  }

  // Agent settings panel
  if (!selectedNode) {
    return (
      <div className="p-6 flex-1 flex flex-col overflow-y-auto">
        <div className="mb-5">
          <label className="font-bold text-blue-700 text-lg block mb-2">Agent Name</label>
          <input
            className="w-full border rounded-lg p-2 font-semibold text-lg"
            value={agentName}
            onChange={handleAgentNameChange}
            placeholder="Name this agent"
          />
        </div>
        <div className="mb-5">
          <label className="font-semibold block mb-1">Voice & Language</label>
          <select
            className="w-full border rounded p-2 mb-2"
            value={metadata.voice}
            onChange={(e) => setMetadata({ ...metadata, voice: e.target.value })}
          >
            {voices.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <select
            className="w-full border rounded p-2"
            value={metadata.language}
            onChange={(e) => setMetadata({ ...metadata, language: e.target.value })}
          >
            {languages.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="font-semibold block mb-1">Global Prompt</label>
          <textarea
            className="w-full border rounded-lg p-2 min-h-[90px]"
            value={metadata.globalPrompt}
            onChange={(e) => setMetadata({ ...metadata, globalPrompt: e.target.value })}
          />
        </div>
        <button
          className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-blue-600 hover:to-indigo-700 transition"
          onClick={handleSave}
        >
          Save Flow
        </button>
        <button
          className="mt-4 text-gray-400 text-xs underline"
          onClick={resetStore}
        >
          Clear & Reset
        </button>
      </div>
    );
  }

  // Node properties panel
  return (
    <div className="p-6 flex-1 flex flex-col overflow-y-auto">
      <div className="mb-5">
        <div className="font-bold text-lg">Node Properties</div>
      </div>
      {renderNodeForm()}
      <button
        className="mt-8 bg-red-100 text-red-700 px-5 py-2 rounded-lg font-bold shadow hover:bg-red-200"
        onClick={() => {
          deleteNode(selectedNodeId);
          resetSelection();
        }}
      >
        Delete Node
      </button>
    </div>
  );
}