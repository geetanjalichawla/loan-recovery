import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import items from "../../Data/sidebar.json";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "w-screen transition-all ease-in-out" : "w-0 sm:w-[223px]"
      } fixed top-[69px] left-0 z-40 text-white h-screen border-b bg-gray-800 border-gray-700 overflow-y-auto transition-all ease-in-out`}
    >
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
