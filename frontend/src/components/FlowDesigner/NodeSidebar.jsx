import React from "react";
import { useFlowDesignerStore } from "../../store/flowDesignerStore";
import { Plus } from "lucide-react";

const nodeTypes = [
  { type: "conversation", label: "Conversation", color: "bg-pink-100" },
  { type: "function", label: "Function", color: "bg-gray-100" },
  { type: "logic", label: "Logic Split Node", color: "bg-blue-100" },
  { type: "ending", label: "Ending", color: "bg-rose-100" },
];

export default function NodeSidebar() {
  const { addNode } = useFlowDesignerStore();

  const handleAddNode = (type) => {
    console.log(`NodeSidebar: Clicking to add node of type: ${type}`);
    if (!addNode) {
      console.error("NodeSidebar: addNode is undefined");
      return;
    }
    addNode(type);
    console.log(`NodeSidebar: Called addNode with type: ${type}`);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="font-bold text-lg text-blue-800 mb-7 tracking-wide">
        ADD NEW NODE
      </div>
      <div className="flex flex-col gap-4">
        {nodeTypes.map((nt) => (
          <button
            key={nt.type}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-base shadow border hover:scale-[1.04] transition-all ${nt.color} border-blue-100 hover:border-blue-400 hover:shadow-lg`}
            onClick={() => handleAddNode(nt.type)}
            type="button"
          >
            <span className="w-6 h-6 flex items-center justify-center">
              <Plus className="text-blue-400" size={20} />
            </span>
            <span>{nt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}