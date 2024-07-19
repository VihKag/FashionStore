// File: src/contexts/UserContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AdminContext = createContext();
const api_domain = "http://localhost:8080";
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState();
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [orders, setOrders] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userStatistics, setUserStatistics] = useState(null);
  const [productStatistics, setProductStatistics] =useState(null);
  const [orderStatistics, setOrderStatistics] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getAllSizes();
    getAllColors();
    getUserByEmail();
  }, [admin]);
  const getOrders = async (userId, status, startDate, endDate, page, size) => {
    try {
      const response = await axios.get(`${api_domain}/api/orders/page`,{
        params: {
          userId: userId,
          status: status,
          startDate:startDate,
          endDate: endDate,
          page: page,
          size: size,
        },
      });
      return response.data; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getAllProducts = async (categoryId, searchValue, page, size) => {
    try {
      const response = await axios.get(`${api_domain}/api/products/all`, {
        params: {
          categoryId: categoryId,
          searchValue: searchValue,
          page: page,
          size: size,
        },
      });
      return response.data; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getUserByEmail = async() =>{
    const email = JSON.parse(sessionStorage.getItem('admin')).email;
    console.log(email);
    try {
      const response = await axios.get(`${api_domain}/api/users/email`,{
        params:{
          email:email,
        },
      })
      setProfile(response);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const getAllUsers = async (searchValue, page, size) => {
    try {
      const response = await axios.get(`${api_domain}/api/users/page`, {
        params: {
          searchValue: searchValue,
          page: page,
          size: size,
        },
      });
      return response.data; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getAllCustomers = async (searchValue, page, size) => {
    try {
      const response = await axios.get(`${api_domain}/api/users/customer`, {
        params: {
          searchValue: searchValue,
          page: page,
          size: size,
        },
      });
      return response.data; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getAllEmployees = async (searchValue, page, size) => {
    try {
      const response = await axios.get(`${api_domain}/api/users/employee`, {
        params: {
          searchValue: searchValue,
          page: page,
          size: size,
        },
      });
      return response.data; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getProductById = async (productId) => {
    try {
      const response = await axios.get(
        `${api_domain}/api/products/${productId}`
      );
      return response.data; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getProductStatistics = async () => {
    try {
      const response = await axios.get(`${api_domain}/api/products/statistics`);
      setProductStatistics(response.data);
      return response.data; // Assuming the response contains secured data

    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const getUserStatistics = async () => {
    try {
      const response = await axios.get(`${api_domain}/api/users/statistics`);
      setUserStatistics(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const  getOrderStatistics = async () => {
    try {
      const response = await axios.get(`${api_domain}/api/orders/statistics`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  const getAllColors = async () => {
    try {
      const colorsList = await axios.get(`${api_domain}/api/color/list`);
      setColors(colorsList.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAllSizes = async () => {
    try {
      const sizesList = await axios.get(`${api_domain}/api/size/list`);
      setSizes(sizesList.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setUserActive = async (userId) => {
    try {
      const response = await axios.put(`${api_domain}/api/users/setActive/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const response = await axios.get(`${api_domain}/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('status', newStatus);
      const response = await axios.put(`${api_domain}/api/orders/update/${orderId}`, 
        formData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: { status: newStatus }
        }
      );
      return await response.data;
    } catch (error) {
       toast.error('Failed to update order status:', error);
      throw error;
    }
  };

  const getRevenueStatistics = async (startDate, endDate, year) => {
    try {
      const response = await axios.get(`${api_domain}/api/statistics/revenue`, {
        params: { startDate, endDate, year },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue statistics', error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        profile,
        setAdmin,
        products,
        sizes,
        colors,
        setProducts,
        users,
        setUsers,
        orders,
        userStatistics,
        productStatistics,
        orderStatistics,
        setUserStatistics,
        setProductStatistics,
        setOrderStatistics,
        setOrders,
        getProductById,
        getAllProducts,
        getOrders,
        getAllSizes,
        getAllColors,
        getAllUsers,
        getUserByEmail,
        getAllEmployees,
        getAllCustomers,
        getOrderStatistics,
        getProductStatistics,
        getUserStatistics,
        setUserActive,
        getOrderById,
        updateOrderStatus,
        getRevenueStatistics
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
