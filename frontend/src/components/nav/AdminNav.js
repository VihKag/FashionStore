import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  BookmarkSquareIcon,
  UserCircleIcon,
  PlusIcon,
  UserIcon,
  UserPlusIcon,
  UserGroupIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
const topNavLinks = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: PresentationChartBarIcon,
  },
  {
    path: "/admin/products",
    name: "Products",
    icon: Squares2X2Icon,
    subLinks: [
      {
        path: "/admin/products",
        name: "Products",
        icon: ShoppingBagIcon,
      },
      {
        path: "/admin/products/add",
        name: "Add Product",
        icon: PlusIcon,
      },
    ],
  },
  {
    path: "/admin/customers",
    name: "Users",
    icon: UserGroupIcon,
    subLinks: [
      {
        path: "/admin/customers",
        name: "Customers",
        icon: UserIcon,
      },
      {
        path: "/admin/employees",
        name: "employees",
        icon: UserCircleIcon,
      },
      {
        path: "/admin/employees/add",
        name: "Add employee",
        icon: UserPlusIcon,
      },
    ],
  },
  {
    path: "/admin/orders",
    name: "Order",
    icon: BookmarkSquareIcon,
  },
  {
    path: "/admin/profile",
    name: "Profile",
    icon: UserCircleIcon,
  },
];
const AdminNav = ({ onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMdScreen = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();

  const [openSubMenus, setOpenSubMenus] = useState({});

  useEffect(() => {
    if (isMdScreen) {
      setIsOpen(false); // Đóng sidebar nếu kích thước màn hình nhỏ hơn md
      onToggleSidebar(false);
    }
  }, [isMdScreen]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggleSidebar(!isOpen);
  };
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // const toggleSubMenu = (index) => {
  //   setOpenSubMenu(openSubMenu === index ? null : index);
  // };
  const toggleSubMenu = (index) => {
    // setOpenSubMenu(openSubMenu === index ? null : index);
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [index]: !prevOpenSubMenus[index],
    }));
  };
  return (
    <div className="flex h-screen fixed">
      {/* Sidebar */}
      <div
        className={`left-0 top-0 bg-gray-900 transition-transform duration-1000 ease-in-out h-full ${
          isOpen ? "w-64" : "w-[68px]"
        }`}
      >
        {/* Toggle Sidebar Button */}
        <button
          className={`absolute py-4 text-white items-center justify-center hover:text-gray-400 focus:outline-none ${
            isOpen ? "w-64" : "w-[68px]"
          }`}
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <div className={`flex items-center justify-around`}>
              <h1 className="text-2xl font-bold font-poetsen">FASHIONSTORE</h1>
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon icon={faBars} size="xl" />
            </div>
          )}
        </button>

        {/* Sidebar Menu */}
        <nav className="pt-16">
          {topNavLinks.map((link, index) => (
            <div key={index} className="relative">
              {link.subLinks ? (
                <div
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn chặn hành vi mặc định
                    toggleSubMenu(index);
                  }}
                  className={`flex items-center py-4 px-4 hover:bg-gray-500 duration-500 hover:cursor-pointer ${
                    !isOpen && "justify-center"
                  } ${!link.subLinks && "focus:border-l-8 focus:bg-gray-700"}`}
                >
                  <link.icon size="xl" className="h-5 w-5 text-white mr-2" />
                  {isOpen && <span className="text-white">{link.name}</span>}
                  {link.subLinks && (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      color="white"
                      size={isOpen ? "lg" : "sm"}
                      className={`ml-auto transition-transform duration-500 ${
                        // openSubMenu === index ? "rotate-90" : ""
                        openSubMenus[index] ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </div>
              ) : (
                <Link
                  to={link.path}
                  exact="true"
                  activeclassname="active"
                  className={`flex items-center py-4 px-4 hover:bg-gray-500 duration-200 ${
                    !isOpen && "justify-center"
                  } ${!link.subLinks && "focus:border-l-8 focus:bg-gray-700"} ${location.pathname ===link.path? "border-l-8" : ""}`}
                >
                  <link.icon size="xl" className="h-5 w-5 text-white mr-2" />
                  {isOpen && <span className="text-white">{link.name}</span>}
                </Link>
              )}
              {link.subLinks && (
                <div
                  className={`sub-menu top-full left-0 bg-gray-800 shadow-lg rounded-md ${
                    // openSubMenu === index ? "block" : "hidden"
                    openSubMenus[index] ? "block" : "hidden"
                  }`}
                >
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subLink.path}
                      exact="true"
                      activeclassname="active"
                      className={`py-3 px-10 hover:bg-gray-600 focus:bg-gray-700 focus:text-lg focus:border-l-8 duration-300 flex items-center ${
                        !isOpen && "justify-center px-4"
                      } ${location.pathname===subLink.path ? "border-l-8" : ""}`}
                    >
                      <subLink.icon className="h-5 w-5 text-white" />
                      {isOpen && (
                        <span className="ml-2 text-white">{subLink.name}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminNav;
