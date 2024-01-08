import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="mt-28 ml-14 p-4 sm:ml-64">{children}</div>
    </div>
  );
};

export default Dashboard;
