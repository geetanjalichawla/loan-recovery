import React from "react";
import { useSelector } from "react-redux";
import Logo from "./Logo";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <nav className="fixed top-0 z-50 w-full  border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="pr-3 lg:pr-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Logo />
          </div>
          <div>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <img
                className="w-8 h-8 rounded-full bg-orange-600"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
