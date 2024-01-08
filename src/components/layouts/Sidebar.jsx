import React from "react";
import SidebarItem from "./SidebarItem";
import items from "../../Data/sidebar.json";

const Sidebar = () => {
  return (
    <div className="sidebar fixed top-[69px] left-0 z-40 w-64 h-screen border-b border-gray-200 bg-gray-800 border-gray-700 ">
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
