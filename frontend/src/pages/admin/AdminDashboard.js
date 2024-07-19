/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// pages/AdminDashboard.js
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import Header from "../../components/header/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faReorder,
  faTasks,
  faTShirt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFirstOrder,
  faJediOrder,
  faSupple,
} from "@fortawesome/free-brands-svg-icons";
import Donut from "../../components/charts/Donut";
import Column from "../../components/charts/Column";
import Statistics from "../../components/Statistics";

const AdminDashboard = () => {
  const {
    userStatistics,
    productStatistics,
    orderStatistics,
    setUserStatistics,
    setProductStatistics,
    setOrderStatistics,
    getOrderStatistics,
    getProductStatistics,
    getUserStatistics,
    getRevenueStatistics,
  } = useContext(AdminContext);
  const [productData, setProductData] = useState();
  const [revenueStatistics, setRevenueStatistics] = useState(null);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  useEffect(() => {
    fetchUserStats();
    fetchStatistics(new Date().getFullYear());
  }, []);
  const fetchUserStats = async () => {
    try {
      const orderStats = await getOrderStatistics();
      if (orderStats) setOrderStatistics(orderStats);

      const userStats = await getUserStatistics();
      if (userStats) setUserStatistics(userStats);

      const productStats = await getProductStatistics();
      if (productStats) setProductStatistics(productStats);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.error("Error message:", error.message);
      console.error("Error status:", error.status);
      console.error("Error stack:", error.stack);
      throw error;
    }
  };
  const fetchStatistics = async (year) => {
    try {
      const data = await getRevenueStatistics(null, null, year);
      setRevenueStatistics(data);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatistics(selectedYear);
  };
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const calculateRowTotal = (months) => {
    return Object.values(months).reduce((sum, value) => sum + (value || 0), 0);
  };
  return (
    <>
      <div className="top-0 sticky z-50">
        <Header />
      </div>
      <div className="bg-white shadow-md rounded m-4 p-4 flex items-center justify-around xl:gap-28 md:gap-10 sm: gap-5">
        <div className="bg-rose-500 min-h-52 min-w-72 w-1/4 rounded-md">
          <div className="p-8">
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faUser} size="3x" color="white" />
              <h2 className="ml-4 text-4xl text-white font-bold">Users</h2>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl text-white font-medium">
                Total users: {userStatistics?.totalUsers}
              </h2>
              <span className="text-2xl text-white font-medium">
                Active Users: {userStatistics?.usersByActiveStatus.active ?? 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-purple-500 min-h-52 min-w-72 w-1/4 rounded-md">
          <div className="p-8">
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faTasks} size="3x" color="white" />
              <h2 className="ml-4 text-4xl text-white font-bold">Orders</h2>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl text-white font-medium">
                Total orders: {orderStatistics?.totalOrders ?? 0}
              </h2>
              <span className="text-2xl text-white font-medium">
                Pending: {orderStatistics?.ordersByStatus.pending}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-violet-500 min-h-52 min-w-72 w-1/4 rounded-md">
          <div className="p-8">
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faTShirt} size="3x" color="white" />
              <h2 className="ml-4 text-4xl text-white font-bold">Products</h2>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl text-white font-medium">
                Total products: {productStatistics?.totalProducts ?? 0}
              </h2>
              <span className="text-2xl text-white font-medium">
                Sales: {productStatistics?.totalActiveProducts ?? 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-violet-500 min-h-52 min-w-72 w-1/4 rounded-md">
          <div className="p-8">
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faMoneyBill} size="3x" color="white" />
              <h2 className="ml-4 text-4xl text-white font-bold">Revenue</h2>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl text-white font-medium">
                Revenue: ${revenueStatistics?.totalRevenue.toFixed(2)}
              </h2>
              <span className="text-2xl text-white font-medium">
                Orders: {revenueStatistics?.totalOrders}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap mx-4">
        <div className="bg-white w-full grid grid-flow-col p-4">
          <div className="p-8 col-span-1 w-full justify-center items-center flex">
            {orderStatistics && <Donut donData={orderStatistics} />}
          </div>
          <div className="p-8 w-full col-span-3 justify-center items-center flex">
            {productStatistics && <Column colData={productStatistics} />}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <form
            onSubmit={handleSubmit}
            className="mb-4 flex items-center space-x-4"
          >
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              min="2000"
              max="2100"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Statistics
            </button>
          </form>
          <h2 className="text-2xl font-semibold mb-4">
            Revenue in {new Date().getFullYear()}
          </h2>
          {revenueStatistics && revenueStatistics.revenueByCategoryAndMonth && (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">
                    Category
                  </th>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month) => (
                    <th
                      key={month}
                      className="py-2 px-4 border-b border-gray-200 text-left"
                    >
                      {month}
                    </th>
                  ))}
                  <th className="py-2 px-4 border-b border-gray-200 text-left">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  revenueStatistics.revenueByCategoryAndMonth
                ).map(([category, monthData]) => {
                  const rowTotal = calculateRowTotal(monthData);
                  return (
                    <tr key={category}>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {category}
                      </td>
                      {months.map((month) => (
                        <td
                          key={month}
                          className="py-2 px-4 border-b border-gray-200"
                        >
                          ${monthData[month]?.toFixed(2) || "0.00"}
                        </td>
                      ))}
                      <td className="py-2 px-4 border-b border-gray-200 font-bold">
                        ${rowTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
