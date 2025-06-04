import Flow from "../models/Flow.js";

// GET /flows/:agentId
export const getFlow = async (req, res) => {
  const { agentId } = req.params;
  const flow = await Flow.findOne({ agentId });
  if (!flow) return res.status(404).json({ error: "Flow not found" });
  res.json({ flow });
};

// POST /flows
export const createFlow = async (req, res) => {
  const { name, nodes, edges, metadata } = req.body;
  const agentId = req.body.agentId || req.body.agent_id || req.body.bot_id; // Flexible
  if (!agentId) return res.status(400).json({ error: "agentId required" });
  const flow = await Flow.create({ name, nodes, edges, metadata, agentId });
  res.status(201).json({ flow });
};

// PUT /flows/:id
export const updateFlow = async (req, res) => {
  const { id } = req.params;
  const { name, nodes, edges, metadata } = req.body;
  const flow = await Flow.findByIdAndUpdate(
    id,
    { name, nodes, edges, metadata },
    { new: true, runValidators: true }
  );
  if (!flow) return res.status(404).json({ error: "Flow not found" });
  res.json({ flow });
};

// DELETE /flows/:id
export const deleteFlow = async (req, res) => {
  const { id } = req.params;
  await Flow.findByIdAndDelete(id);
  res.json({ message: "Flow deleted" });
};