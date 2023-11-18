import React, { useState } from 'react';

const CreateProductDetailForm = () => {
    const optionWarehouse = [
        {id: 1, name: "HCM-Q10", location: "Hồ Chí Minh, Q-10"},
        {id: 2, name: "HCM-C3", location: "Hồ Chí Minh, C-3"},
        {id: 3, name: "TP.HCM", location: "Tp HCM"}
    ];
    const [formData, setFormData] = useState({
        productdetail_id: '',
        warehouse_id: '',
        product_id: '',
        stock_quantity: 0,
        import_date: '',
        selectedSize: '',
        selectedColor: '',
      });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleWarehouseChange = (e)=>{
    setFormData({
        ...formData,
        warehouse_id: e.target.value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleSizeChange = (e) => {
    setFormData({
      ...formData,
      selectedSize: e.target.value,
    });
  };

  const handleColorChange = (e) => {
    setFormData({
      ...formData,
      selectedColor: e.target.value,
    });
  };
  return (
    <>
        
        <div className="container mx-auto">
        <div className='text-xl font-medium mb-4'>Import warehouse</div>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="productdetail_id" className="block text-gray-700">Product Detail ID</label>
            <input
                type="text"
                id="productdetail_id"
                name="productdetail_id"
                value={formData.productdetail_id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="warehouse_id" className="block text-gray-700">Warehouse</label>
            <select
                id="warehouse_id"
                name="warehouse_id"
                value={formData.warehouse_id}
                onChange={handleWarehouseChange}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Chọn Kho</option>
                {optionWarehouse.map((prop)=>(
                    <option key={prop._id} value={prop._id}>{prop.name}</option>
                ))}
            </select>
            {formData.warehouse_id && (
                <div className="text-gray-500">Kho đã chọn: {formData.warehouse_id}</div>
            )}
            </div>

            <div className="mb-4">
            <label htmlFor="product_id" className="block text-gray-700">Product ID</label>
            <input
                type="text"
                id="product_id"
                name="product_id"
                value={formData.product_id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="stock_quantity" className="block text-gray-700">Stock Quantity</label>
            <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="size_id" className="block text-gray-700">Size</label>
            <select
                id="size_id"
                name="size_id"
                value={formData.selectedSize}
                onChange={handleSizeChange}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Choose Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
            </select>
            {formData.selectedSize && (
                <div className="text-gray-500">Size: {formData.selectedSize}</div>
            )}
            </div>

            <div className="mb-4">
            <label htmlFor="color_id" className="block text-gray-700">Color</label>
            <select
                id="color_id"
                name="color_id"
                value={formData.selectedColor}
                onChange={handleColorChange}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Choose Color</option>
                <option value="Đen">Blakc</option>
                <option value="Trắng">White</option>
            </select>
            {formData.selectedColor && (
                <div className="text-gray-500">Color: {formData.selectedColor}</div>
            )}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Add inventory</button>
        </form>
        </div>
    </>

  );
};

export default CreateProductDetailForm;
