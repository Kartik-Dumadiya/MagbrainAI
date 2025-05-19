import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from './pages/SignupPage';
import ProfilePage from "./pages/ProfilePage";
import AgentsPage from "./pages/AgentsPage"; // <-- create this file
import AgentEditPage from "./pages/AgentEditPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="agent/:bot_id" element={<AgentEditPage />} />
        {/* Private Routes (Wrapped in Layout) */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="voice-ai" element={<Dashboard />} />
          <Route path="analytics" element={<Dashboard />} />
          <Route path="billing" element={<Dashboard />} />
          <Route path="api-key" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* Add more routes here */}
        </Route>

        {/* Redirect unknown routes to Sign In */}
        {/* <Route path="*" element={<Navigate to="/signin" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;