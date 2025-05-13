import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Route */}
        <Route path="/" element={<Dashboard />} />

        {/* Placeholder for other routes */}
        <Route path="agents" element={<div>Agents Page</div>} />
        <Route path="analytics" element={<div>Analytics Page</div>} />
        <Route path="billing" element={<div>Billing Page</div>} />

        {/* 404 Not Found Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;