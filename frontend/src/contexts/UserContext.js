// File: src/contexts/UserContext.js
import React, { createContext, useState } from "react";
import axios from "axios";
export const UserContext = createContext();
const api_domain = "http://localhost:8080";
export const UserProvider = ({ children }) => {
  const [profile, setProfile] =useState();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [selectedCartItems, setSelectedCartItems] = useState();
  const [test,setTest]= useState(false);
  const [categories, setCategories] = useState();
  const signIn = async (signInData) => {
    try {
      const response = await axios.post(
        `${api_domain}/api/auth/sign_in`,
        signInData
      );
      return response.data; // Assuming the response contains the JWT token and user information
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const signUp = async (signUpData) => {
    try {
      const response = await axios.post(
        `${api_domain}/api/auth/sign_up`,
        signUpData
      );
      return response; // Assuming the response contains a message for email verification
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getSecuredData = async (token) => {
    try {
      const response = await axios.get(
        `${api_domain}/api/auth/secured`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(
        `${api_domain}/api/products/${id}`,
      );
      return response; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getCategories = async () => {
    try{
      const response = await axios.get(
        `${api_domain}/api/category/list`,
      );
      return response.data;
    }
    catch(error){
      console.error(error);
      return null;
    }
  };

  const verifyEmail = async (verificationToken) => {
    try {
      const response = await axios.get(
        `${api_domain}/api/auth/verify?token=${verificationToken}`
      );
      return response.data; // Assuming the response contains the result of email verification
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  const getAllActiveProducts = async (
    categoryId,
    searchValue,
    minPrice,
    maxPrice,
    page,
    size
  ) => {
    try {
      const response = await axios.get(
        `${api_domain}/api/products/pages`,
        {
          params: {
            categoryId,
            searchValue,
            minPrice,
            maxPrice,
            page,
            size,
          },
        }
      );
      return response; // Assuming the response contains secured data
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getProductsByType = async (type) => {
    try {
      const response = await axios.get(
        `${api_domain}/api/products/type/${type}`
      );
      return response.data; // Assuming the response contains secured data
    } catch (error) {
      // Handle error
      console.error(error);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{
        test,
        setTest,
        categories,
        setCategories,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        products,
        setProducts,
        cartItems,
        setCartItems,
        selectedCartItems,
        setSelectedCartItems,
        signIn,
        signUp,
        getSecuredData,
        verifyEmail,
        getProductById,
        getAllActiveProducts,
        getProductsByType,
        getCategories
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
