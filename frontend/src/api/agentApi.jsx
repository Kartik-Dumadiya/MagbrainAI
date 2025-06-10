import axios from "axios";

export const updateAgent = (bot_id, data) =>
  axios.put(`${ process.env.VITE_API_URL || "http://localhost:3000"}/agents/${bot_id}`, data, { withCredentials: true });