/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import Header from "../../../components/header/HeaderAdmin";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = ({ onAddProduct }) => {
  const [categories, setCategories] = useState([]);
  const { getCategories } = useContext(UserContext);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  };

  const [newProduct, setNewProduct] = useState({
    id: "",
    productName: "",
    category: "",
    brand: "",
    active: null,
    description: "",
    image: "",
    stockQuantity: 0,
  });

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("image", newProduct.image);
      formData.append(
        "product",
        new Blob(
          [
            JSON.stringify({
              id: newProduct.id,
              productName: newProduct.productName,
              brand: newProduct.brand,
              active: newProduct.active,
              description: newProduct.description,
              categoryName: newProduct.category,
              warehouseName: "Kho hàng linh Trung",
            }),
          ],
          { type: "application/json" }
        )
      );

      const response = await axios.post(
        "http://localhost:8080/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setNewProduct({
          id: "",
          productName: "",
          category: "",
          brand: "",
          active: null,
          description: "",
          image: "",
          stockQuantity: 0,
        });
        setMessage("Product added successfully!");
        toast.success(message);
      } else {
        console.error("Failed to add product");
        setMessage("Failed to add product.");
        toast.warning(message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Error adding product.");
      toast.error(message);
    }
  };

  return (
    <>
      <div className="top-0 sticky z-50">
        <ToastContainer autoClose={2000}/>
        <Header />
      </div>

      <div className="p-8">
        {message && <div className="mb-4 text-green-600">{message}</div>}
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="id" className="block font-bold mb-2">
              Product ID
            </label>
            <input
              type="text"
              id="id"
              value={newProduct.id}
              onChange={(e) =>
                setNewProduct({ ...newProduct, id: e.target.value })
              }
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="productName" className="block font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={newProduct.productName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productName: e.target.value })
              }
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-bold mb-2">
              Category
            </label>
            <select
              id="category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="border border-gray-400 p-2 w-full"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brand" className="block font-bold mb-2">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="image" className="block font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.files[0] })
              }
              className="border border-gray-400 p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border border-gray-400 p-2 w-full"
            ></textarea>
          </div>

          <div>
            <label htmlFor="stockQuantity" className="block font-bold mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stockQuantity"
              value={newProduct.stockQuantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stockQuantity: e.target.value })
              }
              className="border border-gray-400 p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="active" className="block font-bold mb-2">
              Active
            </label>
            <input
              type="checkbox"
              id="active"
              checked={newProduct.active}
              onChange={(e) =>
                setNewProduct({ ...newProduct, active: e.target.checked })
              }
              className="border border-gray-400 p-2"
            />
          </div>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProduct;
