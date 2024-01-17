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
      <Navbar toggleSidebar={toggleSidebar} />

     
      {isMobile && (
        <div className="lg:hidden fixed top-[69px] text-white bg-black left-4 z-50">
          <button onClick={toggleSidebar} className="text-white p-3 focus:outline-none">
            {isSidebarOpen ? "<<" : ">>"}
          </button>
        </div>
      )}

      
      {!isMobile && <Sidebar isOpen={isSidebarOpen} />}

    
      <div className={`px-10 py-24 ${isMobile && !isSidebarOpen ? "ml-0" : "ml-64"} transition-all ease-in-out`}>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
