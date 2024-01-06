import React from 'react'
import SidebarItem from './SidebarItem'
import items from "../Data/sidebar.json";


const Sidebar = () => {
    return (

        <div className="sidebar">
          { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        </div>

        
  )
}

export default Sidebar
