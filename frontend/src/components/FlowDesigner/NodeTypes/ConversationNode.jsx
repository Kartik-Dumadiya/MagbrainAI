import React from "react";
import { Handle, Position } from "reactflow";
import { MessageSquare } from "lucide-react";
import { useFlowDesignerStore } from "../../../store/flowDesignerStore";

const selectedStyle = {
  border: "2px solid #ec4899",
  boxShadow: "0 0 0 2px #fbcfe8",
};

export default function ConversationNode({ id, data, selected }) {
  const { setSelectedNodeId } = useFlowDesignerStore();

  return (
    <div
      className={`rounded-lg shadow bg-pink-100 border-l-4 border-pink-400 p-3 min-w-[220px]`}
      style={selected ? selectedStyle : undefined}
      onClick={() => setSelectedNodeId(id)}
    >
      <div className="font-bold text-pink-700 mb-1 flex items-center gap-2">
        <MessageSquare className="text-pink-500" size={16} /> # Conversation
      </div>
      <div className="text-sm text-gray-600 mb-2 whitespace-pre-line">
        {data.message || <span className="text-gray-400">[Bot message here]</span>}
      </div>
      <div className="flex flex-col gap-1">
        {data.transitions?.map((t, i) => (
          <div key={i} className="flex gap-1 items-center text-xs text-pink-500">
            → {t || <span className="opacity-60">[transition]</span>}
          </div>
        ))}
      </div>
      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!bg-pink-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-pink-400" />
    </div>
  );
}