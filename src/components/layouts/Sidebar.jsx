import React from "react";
import SidebarItem from "./SidebarItem";
import items from "../../Data/sidebar.json";

const Sidebar = () => {
  return (
    <div className="sidebar fixed top-[92px] left-0 z-40 w-64 h-screen bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ">
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
