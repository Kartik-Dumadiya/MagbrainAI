import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignUpPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Private Routes (Wrapped in Layout) */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="knowledge-base" element={<KnowledgeBasePage />} />
          {/* Add more routes here */}
        </Route>

        {/* Redirect unknown routes to Sign In */}
        {/* <Route path="*" element={<Navigate to="/signin" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;