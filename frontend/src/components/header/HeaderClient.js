import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingCartButton from "../ShoppingCartButton";
import { faSignIn } from "@fortawesome/free-solid-svg-icons/faSignIn";
import DropdownButton from "../dropdowns/DropDowns";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const HeaderClient = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userInfoString = sessionStorage.getItem("user");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userInfo]);
  const navigate = useNavigate();
  const { categories, setCategories, setUser } = useContext(UserContext);
  const { getCategories } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false); // Thêm state để kiểm soát hiển thị menu trên màn hình nhỏ
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setIsHovering(true);
  };

  const handleMouseLeave = (e) => {
    const target = e.relatedTarget;
    if (!target?.closest(".dropdown-content")) {
      setIsHovering(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginClick = () => {
    navigate("/Signin");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/Signin");
    window.location.reload();
    
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Đảo ngược giá trị showMenu khi nhấn vào nút menu
  };
  return (
    <header className="select-none bg-gray-900">
      <div className="select-none container mx-auto flex justify-between items-center px-4">
        <div className="select-none md:hidden">
          {/* Ẩn nút menu trên màn hình lớn */}
          <button
            onClick={toggleMenu}
            className="select-none text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>

        <div className="select-none hidden md:flex  md:justify-between md:items-center ">
          {/* Ẩn menu trên màn hình nhỏ */}
          <div className="select-none min-w-56 pt-4">
            <DropdownButton
              title="Danh mục"
              iconRight={<FontAwesomeIcon icon={faCaretDown} size="lg" />}
              iconLeft={<FontAwesomeIcon icon={faBars} size="lg" />}
              items={categories}
              linkPath="/products?categoryId="
            />
          </div>
        </div>
        <div className="select-none hidden md:flex md:justify-center md:items-center mr-2 w-full">
          <div className="select-none flex items-center justify-evenly lg:w-3/5 xl:2/5 md:w-full">
            <Link
              to="/"
              className="text-white font-semibold p-2 rounded select-none"
            >
              Homepage
            </Link>
            <Link
              to="/about"
              className="text-white font-semibold p-2 rounded select-none"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-white font-semibold p-2 rounded select-none"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-white font-semibold p-2 rounded select-none"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="select-none py-2 flex items-center justify-evenly ml-2 min-w-72">
          <ShoppingCartButton />

          {isLoggedIn ? (
            <div
              className="flex items-center ml-2 p-2 px-4 relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {!userInfo.image ? (
                <div>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="xl"
                    color="white"
                  />
                </div>
              ) : (
                <img
                  src={userInfo.image}
                  alt="userInfo Avatar"
                  className="select-none w-6 h-6 rounded-full mr-2"
                />
              )}
              <span className="text-white font-semibold ml-3 select-none">
                {userInfo.username}
              </span>
              {isHovering && (
                <div
                  className="select-none absolute top-full left-0 bg-white shadow-lg z-50 dropdown-menu rounded"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/#"
                    className="select-none block px-10 py-2 text-gray-800 hover:bg-gray-200 font-semibold rounded"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="select-none block px-10 py-2 hover:bg-gray-200 font-semibold text-red-500 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 rounded-full hover:bg-blue-700 text-white font-bold py-2 px-4 flex items-center ml-2 select-none"
            >
              <FontAwesomeIcon icon={faSignIn} className="select-none mr-2" />
              Login
            </button>
          )}
        </div>
      </div>

      {/* Menu cho màn hình nhỏ */}
      {showMenu && (
        <div className="select-none md:hidden mx-auto container">
          <div className="select-none px-4 py-2 bg-gray-800">
            <div className="select-none min-w-56 pt-4">
              <DropdownButton
                title="Danh mục"
                iconRight={<FontAwesomeIcon icon={faCaretDown} size="lg" />}
                iconLeft={<FontAwesomeIcon icon={faBars} size="lg" />}
                items={categories}
                linkPath="/products?categoryId="
              />
            </div>
          </div>
          <div className="select-none px-4 py-2 bg-gray-800 mx-auto">
            <Link
              to="/"
              className="text-white font-semibold hover:bg-gray-700 p-2 rounded select-none"
            >
              Homepage
            </Link>
            <Link
              to="/about"
              className="text-white font-semibold hover:bg-gray-700 p-2 rounded select-none"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-white font-semibold hover:bg-gray-700 p-2 rounded select-none"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-white font-semibold hover:bg-gray-700 p-2 rounded select-none"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderClient;
