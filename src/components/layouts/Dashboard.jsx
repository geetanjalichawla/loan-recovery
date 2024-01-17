// import React from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Dashboard = ({ children }) => {
//   return (
//     <div>
//       <Navbar />
//       <Sidebar />

//       <div className=" px-10 py-24 sm:ml-64">{children}</div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if it's a mobile screen
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    checkIsMobile(); // Initial check

    // Update isMobile state on window resize
    const handleResize = () => {
      checkIsMobile();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
