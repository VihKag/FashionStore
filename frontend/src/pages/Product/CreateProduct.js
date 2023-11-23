import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useHandleChange } from '../../utils/FormUtils';
import { getListColor,getListSize } from "../../api/PropertiesApi";
import { addProduct } from "../../api/ProductApi";
import { showSuccessToast, showErrorToast } from '../../utils/toastUtils';
import { ToastContainer} from 'react-toastify';
const CreateProductDetailForm = () => {
  const warehouses = [
    { id: "HCM001", name: "Kho 1" },
  ];
  const categories = [
    { id: "MEN006", name: "Áo thun" },
  ];
  const [colourOptions, setColourOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);

  useEffect(() => {
    const fetchData = async (getApi, setData,id, value) => {
      try {
        const response = await getApi();
        const formattedData = response.data.map(item => ({
          value: item[id], 
          label: item[value],  
        }));
        setData(formattedData);
      } catch (err) {
        console.error(`Error during get API:`, err);
      }
    };
  
    fetchData(getListColor, setColourOptions, 'id', 'colorName');
    fetchData(getListSize, setSizeOptions, 'id', 'sizeName');
  }, []);
  const initialState = {
    warehouseId: '',
    productName: '',
    productId: '',
    category: '',
    color: [],
    size: [],
    description: '',
    productdetails: [],
  };
  const [products, handleChangeProducts] = useHandleChange(initialState);

  const [productList, setProductList] = useState([]);
  const generateProductList = () => {
    const { warehouseId, productId, color, size } = products;
    const newProductList = [];
    for (const colorOption of color) {
      for (const sizeOption of size) {
        const productdetailId = `${productId}-${warehouseId}-${colorOption}-${sizeOption}-${Date.now()}`;

        const newProduct = {
          warehouseId: warehouseId,
          productdetailId,
          productId,
          stockQuantity: 1, 
          size: sizeOption,
          color: colorOption,
          purchasePrice: 0, 
          priceSelling: 0,
        };

        newProductList.push(newProduct);
      }
    }
    setProductList(newProductList);
    handleChangeProducts('productdetails', newProductList);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...productList];
    updatedProducts.splice(index, 1);
    setProductList(updatedProducts);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const dataToSend = {
      productId: products.productId,
      productName: products.productName,
      category: products.category,
      description: products.description,
      productdetails: productList.map((product) => ({
        warehouseId: product.warehouseId,
        productdetailId: product.productdetailId,
        stockQuantity: product.stockQuantity,
        size: product.size,
        color: product.color,
        purchasePrice: product.purchasePrice,
        priceSelling: product.priceSelling,
      })),
    };
    console.log(dataToSend);
    try {
      const success = await addProduct(dataToSend);
      if (success) {
        showSuccessToast('Thêm sản phẩm thành công');
      }
    } catch (err) {
      console.error(err);
      showErrorToast('Thêm sản phẩm thất bại');
    }
  };
  const handleSubmitSave = (e) => {
    e.preventDefault();
    if ( !products.warehouseId || !products.productId || !products.productName || !products.category|| !products.color || !products.size ) {
      showErrorToast('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    generateProductList();
  };

  return (
    <div className="mx-auto">
      <ToastContainer />
      <div className="mb-4">
        <form onSubmit={handleSubmitSave}>
          <div className="w-full text-blue-500 font-bold flex text-xl mb-2">
            <div>
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>
            <div className="mx-2">Nhập thông tin sản phẩm</div>
          </div>
          <div>
            <div className="lg:flex">
              <div className="mr-6">
                <div className="flex items-center mb-2">
                  <div className="mr-2 mb-2 w-20 text-md font-medium">
                    Warehouse
                  </div>
                  <select 
                    value={products.warehouseId}
                    onChange={(e) => handleChangeProducts('warehouseId', e.target.value)}
                    className="block w-52 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 my-auto">
                    {/* <option selected>Choose warehouse</option> */}
                    <option value="">Choose warehouse</option>
                    {warehouses.map((item, index) => (
                      <option key={index} 
                        value={item.id}
                        >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center mb-2">
                  <div className="mr-2 mb-2 w-20 text-md font-medium">
                    Product ID
                  </div>
                  <input
                    value={products.productId}
                    onChange={(e)=> handleChangeProducts('productId', e.target.value)}
                    type="text"
                    className="block w-52 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div className="flex items-center mb-2">
                  <div className="mr-2 mb-2 w-20 text-md font-medium">Name</div>
                  <input
                    value={products.productName}
                    onChange={(e)=> handleChangeProducts('productName', e.target.value)}
                    type="text"
                    className="block w-52 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <div className="mr-2 mb-2 w-20 text-md font-medium">
                    Category
                  </div>
                  <select 
                    value={products.category}
                    onChange={(e) => handleChangeProducts('category', e.target.value)}
                    className="block w-52 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 my-auto">
                    <option value="">Choose category</option>
                    {categories.map((item, index) => (
                      <option key={index} 
                        value={item.id} 
                        >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center mb-2">
                  <div className="mr-2 mb-2 w-20 text-md font-medium">Size</div>
                  <Select
                    name="size"
                    isMulti
                    options={sizeOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      handleChangeProducts(
                        "size",
                        selectedOptions.map((option) => option.value)
                      )
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <div className="mr-2 mb-2 w-20 text-md font-medium">
                    Color
                  </div>
                  <Select
                    name="color"
                    isMulti
                    options={colourOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      handleChangeProducts(
                        "color",
                        selectedOptions.map((option) => option.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="decription"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Decription
              </label>
              <textarea
                id="decription"
                value={products.decription}
                onChange={(e) => handleChangeProducts('description', e.target.value)}
                rows="4"
                className="block p-2.5 w-80 md:w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write decription here..."
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md p-2 bg-blue-500 text-white my-4"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="w-full text-blue-500 font-bold flex text-xl mb-2">
        <div>
          <FontAwesomeIcon icon={faCircleInfo} />
        </div>
        <div className="mx-2">Nhập sản phẩm vào kho</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto rounded-md border-gray-300 border">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ProductDetail ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Purchase Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-3">
                    <div>{product.productdetailId}</div>
                  </td>

                  <td className="px-6 py-3">
                    <input
                      defaultValue={product.stockQuantity}
                      type="number"
                      className="text-sm rounded-md"
                    />
                  </td>

                  <td className="px-6 py-3">{product.size}</td>

                  <td className="px-6 py-3">{product.color}</td>

                  <td className="px-6 py-3">
                    <input type='number' defaultValue={product.purchasePrice} className='text-sm rounded-md'/>
                  </td>
                  <td className="px-6 py-3">
                    <button type="button" onClick={() => removeProduct(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductDetailForm;
