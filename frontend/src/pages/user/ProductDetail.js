import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import HeaderClient from "../../components/header/HeaderClient";
import ProductDescription from "./ProductDescription";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addToCart } from "../../redux/action/CartActions";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { toast, ToastContainer } from "react-toastify";
import DiscountBanner from "../../components/Discount";
import Footer from "../../components/Footer";

const ProductDetails = () => {
  const { getProductById, setTest } = useContext(UserContext);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null); // Change to null initially
  const [mainImage, setMainImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [selectedProductDetailId, setSelectedProductDetailId] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product && product.productDetailDto) {
      // Ensure selectedColor is initialized before filtering product details
      if (!selectedColor) return;

      const selectedDetail = product.productDetailDto.find(
        (detail) =>
          detail.color.colorCode === selectedColor.colorCode &&
          detail.size.sizeName === selectedSize
      );

      if (selectedDetail) {
        setStockQuantity(selectedDetail.stockQuantity);
        setMainImage(selectedDetail.image);
        setSelectedProductDetailId(selectedDetail.id);
      } else {
        // If no matching detail found, reset to defaults
        setStockQuantity(0);
        setMainImage(product.productDto.image);
        setSelectedProductDetailId(null);
      }
    }
  }, [product, selectedColor, selectedSize]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(productId);
      setProduct(response.data);
      setSelectedSize(response.data.productDetailDto[0].size.sizeName);
      setSelectedColor(response.data.productDetailDto[0].color);
      setMainImage(response.data.productDto.image);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.min(Math.max(1, prev + delta), stockQuantity));
  };

  if (!product) return <div>Loading...</div>;

  const { productDto, productDetailDto } = product;

  const handleThumbnailClick = (imageUrl, index) => {
    setMainImage(imageUrl);
    setSelectedImageIndex(index);
  };

  const handleAddToCart = () => {
    if (stockQuantity > 0) {
      dispatch(
        addToCart(
          productDto,
          quantity,
          selectedSize,
          selectedColor,
          selectedProductDetailId
        )
      );
      toast.success("Product added to cart!"); // Replace with a better notification
      setTest(true);
    }
  };

  return (
    <>
      <div>
        <HeaderClient />
        <ToastContainer autoClose={2000} />
        <div className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-gray-500 mb-3 uppercase">
              <Link to="/" className="hover:text-gray-700">
                home
              </Link>
              <span className="mx-1">/</span>
              <span className="text-gray-900">{productDto.productName}</span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Product Images */}
              <div className="md:w-1/2 md:pr-8">
                <div className="relative mb-4">
                  <img
                    src={mainImage}
                    alt={productDto.productName}
                    className="w-full h-auto object-contain"
                  />
                  {/* Assuming you have a sale percentage, you can add it here */}
                </div>
                {/* Add more images if available */}
                <div className="grid grid-cols-4 space-x-2">
                  {[...new Set(productDetailDto.map((item) => item.image))].map(
                    (imageUrl, index) => (
                      <div
                        key={imageUrl}
                        className={`border p-1 flex-shrink-0 cursor-pointer ${
                          index === selectedImageIndex
                            ? "border-gray-800 border-2"
                            : "border-gray-300 opacity-50"
                        }`}
                        onClick={() => handleThumbnailClick(imageUrl, index)}
                      >
                        <img
                          src={imageUrl}
                          alt="Product"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 mt-8 md:mt-0">
                <p className="text-xs text-gray-500 mb-2 uppercase">
                  {productDto.categoryName}
                </p>
                <h1 className="text-2xl font-medium mb-2">
                  {productDto.productName}
                </h1>
                {/* Add reviews if available */}
                <div className="flex items-baseline mb-4">
                  <p className="text-sm font-500 text-gray-500 line-through mr-1">
                    ${productDto.price * 1.2}
                  </p>
                  <p className="text-2xl font-semibold text-[#EB5757]">
                    ${productDto.price}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  {productDto.description}
                </p>

                {/* Color selection */}
                <div className="mb-6">
                  <h3 className="text-xs font-medium uppercase text-gray-500 mb-2">
                    COLOR
                  </h3>
                  <div className="flex space-x-2">
                    {productDetailDto

                      .map((item) => item.color)
                      .filter(
                        (color, index, self) =>
                          self.findIndex(
                            (c) => c.colorCode === color.colorCode
                          ) === index
                      )
                      .sort((a, b) => a.colorCode.localeCompare(b.colorCode))
                      .map((color) => (
                        <button
                          key={color.colorCode}
                          style={{ backgroundColor: color.colorCode }}
                          className={`w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            selectedColor &&
                            selectedColor.colorCode === color.colorCode
                              ? "ring-2 ring-gray-400"
                              : ""
                          }`}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                  </div>
                </div>

                {/* Size selection */}
                <div className="mb-6">
                  <h3 className="text-xs font-medium uppercase text-gray-500 mb-2">
                    SIZE
                  </h3>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full p-2 border border-gray-300 text-sm font-normal text-gray-500"
                  >
                    {productDetailDto
                      .filter(item => item.size != null) // Lọc ra các item có size không phải null
                      .map((item) => item.size)
                      .filter(
                        (size, index, self) =>
                          self.findIndex(
                            (s) => s.sizeName === size.sizeName
                          ) === index
                      )
                      .sort((a, b) => {
                        return a.sizeName.localeCompare(b.sizeName);
                      })
                      .map((size) => (
                        <option key={size.sizeName} value={size.sizeName}>
                          {size.sizeName}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center border border-gray-300 mr-4">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2 text-black text-xl font-medium"
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 text-black text-xl font-medium"
                      disabled={quantity === stockQuantity}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="bg-black text-white px-10 py-3 text-sm font-medium hover:bg-gray-800"
                    onClick={handleAddToCart}
                    disabled={stockQuantity === 0}
                  >
                    {stockQuantity > 0 ? "Add To Cart" : "Out of Stock"}
                  </button>
                </div>
                {stockQuantity > 0 && (
                  <p className="text-sm text-gray-600 mb-4">
                    {stockQuantity} items available.
                  </p>
                )}
                {/* Product meta */}
                <div className="text-xs text-gray-500 space-y-2">
                  <p>
                    <span className="font-semibold text-black">Category :</span>{" "}
                    {productDto.categoryName}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Brand :</span>{" "}
                    {productDto.brand}
                  </p>
                  <p>
                    <span className="font-semibold text-black">SKU:</span>{" "}
                    {productDto.id}
                  </p>
                </div>

                {/* Share and report */}
                <div className="flex items-center mt-6 text-xs">
                  <button className="text-[#EB5757] font-medium flex items-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-2 9h4v2h-4v-2zm-2 0H4v2h4v-2zm6 0h4v2h-4v-2zM2 18v-1c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2z" />
                    </svg>
                    Report This Item
                  </button>
                  <span className="text-black mr-4">Share This</span>
                  <div className="flex space-x-4">
                    {/* Social share buttons */}
                    <div className="flex space-x-4">
                      <a href="/#" className="text-[#3E75B2]">
                        <FontAwesomeIcon
                          icon={faFacebookF}
                          className="h-4 w-4"
                        />
                      </a>
                      <a href="/#" className="text-[#E12828]">
                        <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                      </a>
                      <a href="/#" className="text-[#3FD1FF]">
                        <FontAwesomeIcon icon={faTwitter} className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDescription description={productDto.description} />
      </div>
      <div>
        <DiscountBanner />
        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;
