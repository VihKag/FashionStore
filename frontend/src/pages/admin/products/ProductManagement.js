/* eslint-disable no-unused-vars */
// pages/ProductManagement.js
import React, { useContext, useEffect, useState } from "react";
import {
  Pagination,
  paginate,
} from "../../../components/pagination/pagination";
import { Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import { AdminContext } from "../../../contexts/AdminContext";
import useQueryParams from "../../../hooks/useQueryParams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/HeaderAdmin";

const ProductManagement = () => {
  const { getQueryParam, setQueryParam, removeQueryParam } = useQueryParams();
  const [currentSubLink, setCurrentSubLink] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [size, setSize] = useState(10);
  const sizes = [20, 15, 10, 5];
  const [totalItems, setTotalItems] = useState(0);
  const { getAllProducts, setProducts, products } = useContext(AdminContext);
  useEffect(() => {
    fetchAllProducts();
  }, [categoryId, searchValue, currentPage, size]);
  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts(
        categoryId ? categoryId : null,
        searchValue ? searchValue : null,
        currentPage,
        size
      );
      setProducts(response.content);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalElements);
    } catch (e) {
      console.log(e);
    }
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setQueryParam("page", newPage + 1);
  };
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.previousElementSibling.value);
    setQueryParam("search", event.target.previousElementSibling.value);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setQueryParam("size", event.target.value);
  };
  return (
    <>
      <div className="top-0 sticky z-50">
        <Header />
      </div>

      <div className="mx-auto p-8 h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mb-4">Quản lí sản phẩm</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search product"
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md"
              onClick={(e) => handleSearchChange(e)}
            >
              Search
            </button>

            <div className="inline-flex ">
              <div className="mr-2 items-center justify-center flex text-gray-700">
                <FontAwesomeIcon icon={faFilter} size="lg" />
              </div>
              <select
                className="px-4 py-2 border rounded"
                defaultValue={10}
                value={size}
                onChange={handleSizeChange}
              >
                {sizes.map((value, index) => (
                  <option
                    className="p-2 border rounded mx-auto"
                    key={index}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <Link
              to="/admin/products/add"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Add Product
            </Link>
          </div>
        </div>
        {/* Danh sách sản phẩm */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-2 shadow rounded-sm">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Brand
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products &&
                products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                      {product.productDto.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.productDto.image}
                        alt={product.productDto.productName}
                        className="w-16"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                      {product.productDto.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900 ">
                      ${product.productDto.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.productDto.categoryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.productDto.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span
                        className={`rounded-md font-semibold px-2 ${
                          product.productDto.active
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.productDto.active ? "yes" : "no"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                      {product.productDto.type}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                        <Link
                          to={`/admin/products/${product.productDto.id}`}
                          className="text-indigo-700 bg-indigo-100 hover:text-indigo-500 mr-2 rounded-md font-semibold p-2"
                        >
                          Edit
                        </Link>
                      </button>
                      <button className="text-red-700 bg-red-100 p-2 rounded-md font-semibold hover:text-red-500">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-100 mt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProductManagement;
