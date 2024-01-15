import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div>
      <Sidebar />

      <div className="sm:ml-64">
            <Navbar />
            <div className="p-10 mt-10">
            {children}
            </div>
            </div>
    </div>
  );
};

export default Dashboard;
