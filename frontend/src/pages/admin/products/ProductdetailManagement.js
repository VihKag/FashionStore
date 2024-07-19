import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../../contexts/AdminContext";
import Header from "../../../components/header/HeaderAdmin";

const ProductDetailManagement = () => {
  const { productId } = useParams();
  const { getProductById, sizes, colors } = useContext(AdminContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById();
  }, [productId]);

  const fetchProductById = async () => {
    try {
      const data = await getProductById(productId);
      setProduct(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    console.log("colors:", colors);
  };

  const [productDetails, setProductDetails] = useState([
    // Mô phỏng dữ liệu chi tiết sản phẩm
    {
      id: "1_detail",
      productId: "1",
      product: "Product 1",
      stockQuantity: 10,
      importDate: "2023-05-01",
      color: "Red",
      size: "M",
    },
    // Thêm các chi tiết sản phẩm khác tại đây
  ]);

  const [newProductDetail, setNewProductDetail] = useState({
    id: null,
    image: null,
    stockQuantity: null,
    importDate: null,
    color: null,
    size: null,
  });

  const [editingProductDetail, setEditingProductDetail] = useState(null);

  // Xử lý thay đổi nhập liệu cho chi tiết sản phẩm mới
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductDetail({ ...newProductDetail, [name]: value });
  };

  // Xử lý thêm chi tiết sản phẩm mới
  const handleAddProductDetail = () => {
    setProductDetails([
      ...productDetails,
      {
        ...newProductDetail,
      },
    ]);
    setNewProductDetail({
      id: null,
      image: null,
      stockQuantity: null,
      importDate: null,
      color: null,
      size: null,
    });
  };

  // Xử lý xóa chi tiết sản phẩm
  const handleDeleteProductDetail = (id) => {
    setProductDetails(productDetails.filter((detail) => detail.id !== id));
  };

  // Xử lý chỉnh sửa chi tiết sản phẩm
  const handleEditProductDetail = (productDetail) => {
    setEditingProductDetail({
      ...productDetail,
      colorId: productDetail.color.id,
      sizeId: productDetail.size.id,
    });
  };

  const handleUpdateProductDetail = (updatedProductDetail) => {
    setProductDetails(
      productDetails.map((detail) =>
        detail.id === updatedProductDetail.id ? updatedProductDetail : detail
      )
    );
    setEditingProductDetail(null);
  };

  return (
    <>
      <div className="top-0 sticky z-50">
        <Header />
      </div>

      <div className="mx-auto p-8 bg-white rounded-sm mt-4 h-screen">
        <h1 className="text-3xl font-bold mb-4">Quản Lý Chi Tiết Sản Phẩm</h1>

        <div className="mb-6 my-6 flex flex-wrap justify-between items-end">
          {/* Các trường nhập liệu */}
          <h1 className="text-2xl font-semibold mb-2">Thêm sản phẩm</h1>
          <div className="w-full flex flex-wrap mb-2 justify-between">
            <input
              type="text"
              name="productId"
              placeholder="ID Sản Phẩm"
              value={newProductDetail.productId}
              onChange={handleInputChange}
              className="border px-4 py-2"
            />
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={newProductDetail.id}
              onChange={handleInputChange}
              className="border px-4 py-2"
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewProductDetail({
                    ...newProductDetail,
                    image: e.target.files[0],
                  })
                }
                className="border px-4 py-2"
              />
              {/* {newProductDetail.image && (
              <img
                src={URL.createObjectURL(newProductDetail.image)}
                alt="Preview"
                className="mt-2 max-w-xs"
              />
            )} */}
            </div>
            <input
              type="number"
              name="stockQuantity"
              placeholder="Số Lượng Tồn Kho"
              value={newProductDetail.stockQuantity}
              onChange={handleInputChange}
              className="border px-4 py-2"
            />
            <input
              type="date"
              name="importDate"
              placeholder="Ngày Nhập"
              value={newProductDetail.importDate}
              onChange={handleInputChange}
              className="border px-4 py-2"
            />
            <select
              name="colorId"
              value={newProductDetail.colorId}
              onChange={handleInputChange}
              className="border px-4 py-2"
            >
              <option value="">Chọn màu sắc</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.colorName}
                </option>
              ))}
            </select>
            <select
              name="sizeId"
              value={newProductDetail.sizeId}
              onChange={handleInputChange}
              className="border px-4 py-2"
            >
              <option value="">Chọn kích cỡ</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.sizeName}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddProductDetail}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Danh sách chi tiết sản phẩm */}
        <h1 className="text-2xl font-semibold mb-2">Thông tin sản phẩm</h1>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="table-auto w-full divide-y divide-gray-200 border-x-2 border-b-2 shadow rounded-sm">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Import
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {product &&
                product.productDetailDto.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={item.image} alt="product" className="w-16" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex">
                      {item.stockQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.importDate}
                    </td>
                    <td
                      value={item.color.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center"
                    >
                      <span
                        style={{ backgroundColor: item.color.colorCode }}
                        className="w-6 h-6 rounded-full block focus:outline-none focus:ring-2 focus:ring-offset-2 mr-2"
                      ></span>
                      {item.color.colorName}
                    </td>
                    <td
                      value={item.size.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {item.size.sizeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditProductDetail(item)}
                        className="text-indigo-700 bg-indigo-100 hover:text-indigo-500 mr-2 rounded-md font-semibold p-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProductDetail(item.id)}
                        className="text-red-700 bg-red-100 p-2 rounded-md font-semibold hover:text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Form chỉnh sửa chi tiết sản phẩm */}
        {editingProductDetail && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Edit Product Detail</h2>
            <div className="flex justify-between">
              <input
                type="text"
                name="id"
                placeholder="Id Sản Phẩm"
                disabled
                value={editingProductDetail.productId}
                onChange={(e) =>
                  setEditingProductDetail({
                    ...editingProductDetail,
                    productId: e.target.value,
                  })
                }
                className="border px-4 py-2 mr-2"
              />
              <input
                type="number"
                name="stockQuantity"
                placeholder="Số Lượng Tồn Kho"
                value={editingProductDetail.stockQuantity}
                onChange={(e) =>
                  setEditingProductDetail({
                    ...editingProductDetail,
                    stockQuantity: e.target.value,
                  })
                }
                className="border px-4 py-2 mr-2"
              />
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  setEditingProductDetail({
                    ...editingProductDetail,
                    image: e.target.files[0],
                  })
                }
                className="border px-4 py-2 mb-2"
              />
              <input
                type="date"
                name="importDate"
                placeholder="Ngày Nhập"
                value={editingProductDetail.importDate}
                onChange={(e) =>
                  setEditingProductDetail({
                    ...editingProductDetail,
                    importDate: e.target.value,
                  })
                }
                className="border px-4 py-2 mr-2"
              />
              <select
                name="colorId"
                value={
                  editingProductDetail.colorId || editingProductDetail.color.id
                }
                onChange={(e) =>
                  setEditingProductDetail({
                    ...editingProductDetail,
                    colorId: e.target.value,
                  })
                }
                className="border px-4 py-2 mb-2"
              >
                <option value="">Chọn màu sắc</option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.colorName}
                  </option>
                ))}
              </select>
              <select
                name="sizeId"
                value={
                  editingProductDetail.sizeId || editingProductDetail.size.id
                }
                onChange={(e) =>
                  setEditingProductDetail({
                    ...editingProductDetail,
                    sizeId: e.target.value,
                  })
                }
                className="border px-4 py-2 mb-2"
              >
                <option value="">Chọn kích cỡ</option>
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.sizeName}
                  </option>
                ))}
              </select>
              <div>
                <button
                  onClick={() =>
                    handleUpdateProductDetail(editingProductDetail)
                  }
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProductDetail(null)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailManagement;
