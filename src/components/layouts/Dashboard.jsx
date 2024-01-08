import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className=" px-10 py-24 sm:ml-64">{children}</div>
    </div>
  );
};

export default Dashboard;
