import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTrash,
  faEllipsisH,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/action/CartActions";
import { UserContext } from "../contexts/UserContext";

const ShoppingCartButton = () => {
  const [showCart, setShowCart] = useState(false);
  const [log, setLog] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(()=>{
    const isLog = sessionStorage.getItem("login");
    if(isLog){
       setLog(isLog);
    }
  },[])
  const toggleCart = () => {
    if (log) {
      setShowCart(!showCart);
    }else{
      navigate('/signin');
    }

  };

  const removeItemFromCart = (productId, size, color) => {
    dispatch(removeFromCart(productId, size, color));
  };
  const displayedItems = cartItems.slice(0, 3); // Only display first 3 items

  return (
    <div className="relative">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
        onClick={toggleCart}
      >
        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
        Cart
        {cartItems.length > 0 && (
          <span className="ml-2 bg-red-500 w-6 h-6 rounded-full text-sm font-semibold flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {showCart && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-50">
          <div className="p-4">
            <form className="m-auto max-w-[672px] p-4">
              <ul className="space-y-4">
                {displayedItems.map((item, index) => (
                  <li key={index} className="flex items-center py-3 border-b">
                    <img
                      src={item.product.image}
                      alt={item.product.productName}
                      className="h-16 w-16 flex-none rounded-md border"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-sm">
                        <Link to={`/product/${item.product.id}`}>
                          {item.product.productName}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-500">
                        {item.color.colorName} - {item.size}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-medium">
                          ${item.product.price} x {item.quantity}
                        </p>
                        <button
                          onClick={() =>
                            removeItemFromCart(
                              item.product.id,
                              item.size,
                              item.colorCode
                            )
                          }
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-gray-400 hover:text-red-500"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                {cartItems.length > 3 && (
                  <li className="flex items-center justify-center py-2">
                    <FontAwesomeIcon icon={faEllipsisH} className="mr-2" />
                  </li>
                )}
              </ul>
              <div className="text-center pt-2">
                <Link
                  to="/cart"
                  className="text-base font-medium bg-blue-500 text-white flex items-center justify-center p-2 rounded-sm"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  Your cart
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartButton;
