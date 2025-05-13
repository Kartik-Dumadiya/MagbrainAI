import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "../components/Table";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 flex-1 overflow-y-auto">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;