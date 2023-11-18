import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Select from "react-select";
import { useHandleChange } from '../../utils/FormUtils';
const CreateProductDetailForm = () => {
  const warehouses = [
    { id: 1, name: "WH1" },
    { id: 2, name: "WH2" },
  ];
  const categories = [
    { id: 1, name: "CG1" },
    { id: 2, name: "CG2" },
  ];
  const colourOptions = [
    { value: "Đỏ nâu", label: "Đỏ nâu" },
    { value: "Đen", label: "Đen" },
    { value: "Xanh rêu", label: "Xanh rêu" },
  ];
  const sizeOptions = [
    { value: "Small", label: "S" },
    { value: "Medium", label: "M" },
    { value: "Large", label: "L" },
    { value: "Extra Large", label: "xL" },
    { value: "2 Extra Large", label: "2xL" },
  ];
  const initialState = {
    warehouse_id: '',
    product_name: '',
    product_id: '',
    category: '',
    color: [],
    size: [],
    description: '',
  };
  const [products, handleChange1] = useHandleChange(initialState);

  const [productList, setProductList] = useState([]);
  const generateProductList = () => {
    const { warehouse_id, product_id, color, size } = products;
    const newProductList = [];
    for (const colorOption of color) {
      for (const sizeOption of size) {
        const productdetail_id = `${product_id}-${warehouse_id}-${colorOption}-${sizeOption}-${Date.now()}`;

        const newProduct = {
          warehouse_id: warehouse_id,
          productdetail_id,
          product_id,
          stock_quantity: 1, 
          selectedSize: sizeOption,
          selectedColor: colorOption,
          purchasePrice: 0, 
          sellingPrice: 0,
        };

        newProductList.push(newProduct);
      }
    }

    setProductList(newProductList);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...productList];
    updatedProducts.splice(index, 1);
    setProductList(updatedProducts);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productList);
    console.log(products);
  };
  const handleSubmitSave = (e) => {
    e.preventDefault();
    generateProductList();
    console.log(products);
  };
  return (
    <div className="mx-auto">
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
                    value={products.warehouse_id}
                    onChange={(e) => handleChange1('warehouse_id', e.target.value)}
                    className="block w-52 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 my-auto">
                    <option selected>Choose warehouse</option>
                    {warehouses.map((item, index) => (
                      <option key={index} 
                        value={item.id}
                        // onClick={()=> setProducts({...products, category: item.id})}
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
                    value={products.product_id}
                    onChange={(e)=> handleChange1('product_id', e.target.value)}
                    type="text"
                    className="block w-52 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div className="flex items-center mb-2">
                  <div className="mr-2 mb-2 w-20 text-md font-medium">Name</div>
                  <input
                    value={products.product_name}
                    onChange={(e)=> handleChange1('product_name', e.target.value)}
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
                    onChange={(e) => handleChange1('category', e.target.value)}
                    className="block w-52 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 my-auto">
                    <option selected>Choose category</option>
                    {categories.map((item, index) => (
                      <option key={index} 
                        value={item.id} 
                        // onClick={()=> setProducts({...products, category: item.id})}
                        >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center mb-2">
                  <div className="mr-2 mb-2 w-20 text-md font-medium">Size</div>
                  <Select
                    // defaultValue={sizeOptions[0]}
                    name="size"
                    isMulti
                    options={sizeOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      handleChange1(
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
                      handleChange1(
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
                onChange={(e) => handleChange1('description', e.target.value)}
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
                    <div>{product.productdetail_id}</div>
                  </td>

                  <td className="px-6 py-3">
                    <input
                      defaultValue={product.stock_quantity}
                      type="number"
                      className="text-sm rounded-md"
                    />
                  </td>

                  <td className="px-6 py-3">{product.selectedSize}</td>

                  <td className="px-6 py-3">{product.selectedColor}</td>

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
