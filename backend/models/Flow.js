import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  id: String,
  type: String,
  position: { x: Number, y: Number },
  data: mongoose.Schema.Types.Mixed,
}, { _id: false });

const EdgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
  label: String,
}, { _id: false });

const FlowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nodes: [NodeSchema],
  edges: [EdgeSchema],
  metadata: {
    voice: String,
    language: String,
    globalPrompt: String,
  },
  agentId: { type: String, required: true }, // link to agent.bot_id
}, { timestamps: true });

export default mongoose.model("Flow", FlowSchema);