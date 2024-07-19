import {
  faBell,
  faCaretDown,
  faSearch,
  faCog,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setUser } = useContext(UserContext);
  const userInfoString = sessionStorage.getItem("admin");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const handleLogout = () => {
    // Remove user information from session storage
    sessionStorage.removeItem("admin");
    // Update the user state
    setUser(null);
    // Redirect to the desired page (e.g., login page)
    navigate("/signin");
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Ngăn chặn event propagation
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-gray-900 text-white py-2 px-6 flex justify-between items-center select-none">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white placeholder-gray-400 py-2 px-4 rounded-md pr-10 xl:min-w-96 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="p-2 mr-4">
          <FontAwesomeIcon icon={faBell} size="xl" />
        </div>
        <div className="p-2 mr-4">
          <FontAwesomeIcon icon={faCog} size="xl" />
        </div>
        <div className="relative">
          <button
            className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center dropdown-admin"
            onClick={toggleDropdown}
          >
            {userInfo ? (
              !userInfo.image ? (
                <div className="w-8 h-8 rounded-full mr-4 items-center flex justify-center">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="xl"
                    color="white"
                  />
                </div>
              ) : (
                <img
                  className="w-8 h-8 rounded-full mr-4 select-none"
                  src={userInfo.image}
                  alt="avatar"
                />
              )
            ) : (
              // Render a placeholder or loading spinner while userInfo is null
              <div className="w-8 h-8 rounded-full mr-4 bg-gray-300 animate-pulse" />
            )}

            <span className="mr-2 select-none">{userInfo.username}</span>
            <FontAwesomeIcon icon={faCaretDown} size="lg" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
              <Link
                to="/#"
                className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-200 font-semibold"
              >
                Profile
              </Link>
              <Link
                to="/#"
                className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-200 font-semibold"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 border-t hover:bg-gray-200 font-semibold text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
