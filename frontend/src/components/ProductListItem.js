import React from 'react';
import { Link } from 'react-router-dom';
const ProductListItem = ({ product, productDetails }) => {
  const { image, productName, price, id } = product;
  const colors = productDetails.map(detail => detail.color.colorName);
  const uniqueColors = [...new Set(colors)].join(', ');
  const linkProduct = `/products/${id}`;
  return (
    <>
      <Link to={linkProduct} className="relative hover:scale-105 duration-300 select-none">
        <div className="w-full h-[364px] bg-white flex justify-center items-center p-3 mb-6 relative overflow-hidden">
          <img
            src={image}
            alt={productName}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between p-3">
          <div>
            <h3 className="text-md text-gray-700">
              <div>
                <span aria-hidden="true" className="absolute inset-0"></span>
                {productName}
              </div>
            </h3>
            <p className="mt-1 text-md text-gray-500">{uniqueColors}</p>
          </div>
          <p className="text-md font-medium text-gray-900">${price}</p>
        </div>
      </Link >
    </>
  );
};

export default ProductListItem;