import React from "react";
import SidebarItem from "./SidebarItem";
import items from "../../Data/sidebar.json";
import Logo from "./Logo";

const Sidebar = () => {
  return (
    <div className="sidebar fixed w-64 h-screen border-b bg-gray-800 border-gray-700 top-0 ">
      <div className="flex items-center justify-start rtl:justify-end w-full p-2">
        <Logo />
      </div>
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
