import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import { FaSignOutAlt } from "react-icons/fa";
import { setMessage } from "../../redux/user/userSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const dispatch = useDispatch();
  const signout = ()=>{
    localStorage.removeItem('token');
    dispatch(setMessage('logged out successfully'));
  }
  const [menu, setmenu] = useState(false);
  return (
    <nav className="fixed top-0 z-50 w-full md:max-w-[calc(100vw-256px)] px-10  border-b border-gray-600 bg-slate-800 h-16 ">
          <div className="w-full flex justify-end place-items-center h-full ">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
              onClick={()=>setmenu(prev=>!prev)}
            >
              <img
                className="w-10 h-10 rounded-full bg-orange-600"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>
            {menu&& <div className="absolute right-10 z-10 top-12 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
        <a onClick={()=>{signout()}} className="px-4 py-2 text-sm text-gray-700 flex gap-1 items-center cursor-pointer" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out <FaSignOutAlt/></a>
          </div>}

          </div>
    </nav>
  );
};

export default Navbar;
