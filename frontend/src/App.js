/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import Shop from "./pages/user/Shop";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/products/ProductManagement";
import AdminLayout from "./pages/admin/AdminLayout";
import UserLayout from "./pages/user/UserLayout";
import ErrorPage from "./pages/ErrorPage";
import { AdminContext, AdminProvider } from "./contexts/AdminContext";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import ProductdetailManagement from "./pages/admin/products/ProductdetailManagement";
import AddProduct from "./pages/admin/products/AddProduct";
import ProfileAdmin from "./pages/admin/ProfileAdmin";
import Customer from "./pages/admin/users/Customer";
import AddUser from "./pages/admin/users/AddUser";
import OrderManagement from "./pages/admin/orders/OrderManagement";
import OrderDetail from "./pages/admin/orders/OrderDetail";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/checkout/Checkout";
import Contact from "./pages/user/Contact";
import Products from "./pages/user/Products";
import ProductDetails from "./pages/user/ProductDetail";
import ScrollToTop from "./hooks/ScrollToTop";
import ProfileUser from "./pages/user/ProfileUser";
import Employee from "./pages/admin/users/Employee";
import VerificationSuccess from "./pages/VerificationSuccess";
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route
            path="products/:productId"
            element={<ProductdetailManagement />}
          />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />
          <Route path="customers" element={<Customer />} />
          <Route path="employees" element={<Employee />} />
          <Route path="employees/add" element={<AddUser />} />
        </Route>

        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="profile" element={<ProfileUser />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification-success" element={<VerificationSuccess />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
