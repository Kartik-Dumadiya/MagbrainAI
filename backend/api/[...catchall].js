import { createServer, proxy } from '@vendia/serverless-express';
import app from '../server.js'; // Import your Express app

// Create a serverless handler for your Express app
const server = createServer(app);

export default function handler(req, res) {
  proxy(server, req, res);
}

