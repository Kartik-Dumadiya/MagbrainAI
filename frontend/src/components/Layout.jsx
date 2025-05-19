import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
        {/* Main Content (Dynamic) */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      
    </div>
  );
};

export default Layout;