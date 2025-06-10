import axios from "axios";

export const updateAgent = (bot_id, data) =>
  axios.put(`${import.meta.env.VITE_API_URL}/api/agents/${bot_id}`, data, { withCredentials: true });