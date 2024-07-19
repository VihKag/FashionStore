/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../../../components/pagination/pagination";
import AddUser from "./AddUser";
import { AdminContext } from "../../../contexts/AdminContext";
import useQueryParams from "../../../hooks/useQueryParams";
import Header from "../../../components/header/HeaderAdmin";

const Employee = () => {
  const { getQueryParam, setQueryParam, removeQueryParam } = useQueryParams();
  const { getAllUsers, getAllEmployees, setUsers, users, setUserActive } =
    useContext(AdminContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [size, setSize] = useState(10);
  const sizes = [20, 15, 10, 5];
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchAllUsers();
  }, [searchValue, currentPage, size, users]);
  const fetchAllUsers = async () => {
    const response = await getAllEmployees(
      searchValue ? searchValue : null,
      currentPage,
      size
    );
    setUsers(response.content);
    setTotalPages(response.totalPages);
    setTotalItems(response.totalElements);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setQueryParam("page", newPage + 1);
  };
  const handleSetActiveUser = async(userId)=>{
    const response = await setUserActive(userId);
  }

  return (
    <>
      <div className="top-0 sticky z-50">
        <Header />
      </div>

      <div className="mx-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mb-4">Quản lí nhân viên</h1>
          <Link
            to="/admin/employees/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Birthday
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Active
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users &&
                users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              user.image ||
                              `https://i.pravatar.cc/150?img=${index + 1}`
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.birthday || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.gender ? "Male" : "Female"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.active ? "Active" : "Block"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {user.active ? (
                        <button
                          className="text-yellow-700 bg-yellow-100 p-2 rounded-md font-semibold hover:text-yellow-500"
                          onClick={() => handleSetActiveUser(user.id)}
                        >
                          Block
                        </button>
                      ) : (
                        <button 
                          className="text-blue-700 bg-blue-100 p-2 rounded-md font-semibold hover:text-blue-500"
                          onClick={() => handleSetActiveUser(user.id)}
                          >
                          Active
                        </button>
                      )}
                      <button
                        href="/#"
                        className="text-red-700 bg-red-100 p-2 rounded-md font-semibold hover:text-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Hiển thị component AddProduct nếu đang ở trang thêm sản phẩm mới */}
        {window.location.pathname === "/admin/employees/add" && <AddUser />}
      </div>
    </>
  );
};

export default Employee;
