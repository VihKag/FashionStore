/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import ProductListItem from "../../components/ProductListItem";
import HeaderClient from "../../components/header/HeaderClient";
import { Pagination } from "../../components/pagination/pagination";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import useQueryParams from "../../hooks/useQueryParams";
import DiscountBanner from "../../components/Discount";
import Footer from "../../components/Footer";

const Products = () => {
  const { getQueryParam, setQueryParam, removeQueryParam } = useQueryParams();

  const categoryParam = getQueryParam("categoryId") || "";
  const searchValueParam = getQueryParam("searchValue") || "";
  const minPriceParam = getQueryParam("minPrice") || "0";
  const maxPriceParam = getQueryParam("maxPrice") || "10000000";
  const pageParam = getQueryParam("page") || "0";
  const sizeParam = getQueryParam("size") || "9";

  const sizes = [15, 12, 9, 6];
  const priceRange = { min: 0, max: 10000000 };
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [size, setSize] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { getAllActiveProducts, cartItems, getCategories } =
  useContext(UserContext);
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [categoryId, searchValue, minPrice, maxPrice, currentPage, size, categoryParam]);

  const fetchProducts = async () => {
    try {
      const response = await getAllActiveProducts(
        categoryParam || categoryId ? categoryParam || categoryId : null,
        searchValue ? searchValue : null,
        minPrice,
        maxPrice,
        currentPage,
        size
      );
      setAllProducts(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalElements);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryChange = (categoryId) => {
    if (categoryId === "All") {
      setCategoryId(null);
      removeQueryParam("categoryId");
    } else {
      setCategoryId(categoryId);
      console.log(false);
      setQueryParam("categoryId", categoryId);
    }
    setSelectedCategory(categoryId); 
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setQueryParam("page", newPage + 1);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setQueryParam("size", event.target.value);
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.previousElementSibling.value);
    setQueryParam("search", event.target.previousElementSibling.value);
  };
  const handlePriceRangeChange = () => {

  };
  return (
    <>
      <HeaderClient />
      <div className="container mx-auto p-4 md:flex min-w-96">
        <div className="md:hidden mb-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 ml-4 rounded inline-flex items-center"
            onClick={() => setShowNav(!showNav)}
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
            <span>Filter</span>
          </button>
        </div>

        <div
          className={`md:w-1/4 min-w-[262px] border h-screen md:mb-0 transition-all duration-300 mr-4 bg-white ${
            showNav ? "block" : "hidden md:block"
          }`}
        >
          <div className="mt-8 category-list ">
            {/* Price range filter */}
            <div className="mt-6 px-6">
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  min={priceRange.min}
                  value={minPrice}
                  className="w-24 border px-2 py-1 mr-2"
                />
                <span>-</span>
                <input
                  type="number"
                  max={priceRange.max}
                  value={maxPrice}
                  className="w-24 border px-2 py-1 ml-2"
                />
              </div>
              <button>Áp dụng</button>
            </div>

            <div className="mt-6 ">
              <h3 className="text-lg font-semibold mb-2 px-6">Categories</h3>
              <div
                key="All"
                className={`p-3.5 block select-none w-full pl-6 hover:cursor-pointer hover:bg-slate-600 hover:text-white duration-200 hover:text-[17px] hover:font-[550]
                      ${
                        selectedCategory === "All"
                          ? "bg-slate-500 text-white text-[17px] font-[550]"
                          : ""
                      }`}
                onClick={() => handleCategoryChange("All")}
              >
                Tất cả
              </div>
              {categories &&
                categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-3.5 block select-none w-full pl-6 hover:cursor-pointer hover:bg-slate-600 hover:text-white duration-200 hover:text-[17px] hover:font-[550]
                      ${
                        selectedCategory === category.id
                          ? "bg-slate-500 text-white"
                          : ""
                      }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </div>
                ))}
              {/* </select> */}
            </div>
          </div>
        </div>

        <div className="md:w-3/4 h-full w-full min-w-96">
          <div className="flex justify-between items-center border p-6 bg-white">
            <div className="flex items-center">
            <span>
              Showing {currentPage * size + 1}-
              {Math.min((currentPage + 1) * size, totalItems)} of {totalItems}{" "}
              results
            </span>
            <div className="pl-8">
            <input
              type="text"
              placeholder="Search product"
              className="border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md ml-2"
              onClick={(e) => handleSearchChange(e)}
            >
              Search
            </button>
            </div>
            </div>
            

            <div className="inline-flex">
            
              <div className="mr-2 items-center justify-center flex text-gray-700">
                <FontAwesomeIcon icon={faFilter} size="lg" />
              </div>
              <select
                className="px-4 py-2 border rounded"
                defaultValue={9}
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
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6 mt-8 border p-6 bg-white">
            {allProducts.map((product, index) => (
              <ProductListItem
                key={index}
                product={product.productDto}
                productDetails={product.productDetailDto}
              />
            ))}
          </div>
          {/* Render pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div>
        <DiscountBanner />
        <Footer />
      </div>
    </>
  );
};
export default Products;
