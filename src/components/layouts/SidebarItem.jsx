import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link to={item.path || "#"} className="sidebar-item plain">
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </Link>
    );
  }
};

// PropTypes
SidebarItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    childrens: PropTypes.arrayOf(
      PropTypes.shape({
        // Recursively check for children PropTypes if needed
        icon: PropTypes.string,
        title: PropTypes.string.isRequired,
        path: PropTypes.string,
        childrens: PropTypes.array,
      })
    ),
  }),
};

export default SidebarItem;
