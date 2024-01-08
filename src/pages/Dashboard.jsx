import React from "react";
import AddAgentForm from "./AddAgentForm";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
        <Sidebar />

      <div className="mt-28 ml-14 p-4 sm:ml-64">
        <AddAgentForm />
      </div>
    </div>
  );
};

export default Dashboard;
