import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from './pages/SignupPage';
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Private Routes (Wrapped in Layout) */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="agents" element={<Dashboard />} />
          <Route path="voice-ai" element={<Dashboard />} />
          <Route path="analytics" element={<Dashboard />} />
          <Route path="billing" element={<Dashboard />} />
          <Route path="api-key" element={<Dashboard />} />
          {/* Add more routes here */}
        </Route>

        {/* Redirect unknown routes to Sign In */}
        {/* <Route path="*" element={<Navigate to="/signin" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;