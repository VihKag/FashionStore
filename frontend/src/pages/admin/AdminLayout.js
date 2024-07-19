import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "../../components/nav/AdminNav";
import Header from "../../components/header/HeaderAdmin";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AdminContext } from "../../contexts/AdminContext";
const AdminLayout = () => {
  const navigate = useNavigate();
  const { isAdmin} = useContext(UserContext);
  const {setAdmin} = useContext(AdminContext);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));

    if (admin !== "undefined" && admin.role) {
      // setAdmin(admin);
    } else {
      navigate("/signin");
    }
  }, []);
  const handleToggleSidebar = (isOpen) => {
    setIsOpen(isOpen);
  };
  return (
    <div className="flex bg-gray-100 select-none w-full">
      <div className="">
        <AdminNav onToggleSidebar={handleToggleSidebar} />
      </div>
      <div
        className={`flex-1 transition-all ease-in-out duration-100 h-auto ${
          isOpen ? "ml-64" : "ml-[68px]"
        }`}
      >
          <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
