// OrderSummary.js
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
export default function OrderSummary(props) {
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedCartItems(props.props);

    const userString = sessionStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, [props.props]);
  const calculateSubtotal = () => {
    if (selectedCartItems) {
      return selectedCartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    }
    return 0;
  };
  const handleCreateOrder = async () => {
    if (!user || !address) {
      toast.info("Vui lòng cung cấp thông tin địa chỉ giao hàng");
      return;
    }

    const orderDetails = selectedCartItems.map((item) => ({
      productDetailId: item.productdetailId,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));
    if (!orderDetails || orderDetails.length === 0) {
      toast.warn("Vui lòng chọn sản phẩm để đặt hàng");
      return;
    }
    
    const orderDto = {
      address: address,
      email: user.email,
      status: "pending",
      orderdetails: orderDetails,
    };
    console.log(orderDto);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/orders/create`,
        orderDto
      );

      if (response.status === 200) {
        toast.success("Order created successfully!");
         // Get cart items from localStorage
         const email = user.email;
         const cartItems = JSON.parse(localStorage.getItem(`cartItems_${email}`)) || [];
 
         // Filter out ordered items from the cart
         const remainingCartItems = cartItems.filter(cartItem =>
           !orderDetails.some(orderItem => orderItem.productDetailId === cartItem.productdetailId)
         );
 
         // Update the cart in localStorage
         localStorage.setItem(`cartItems_${email}`, JSON.stringify(remainingCartItems));
 
         // Update the cart state
        dispatch({ type: 'UPDATE_CART', payload: remainingCartItems });
        setSelectedCartItems([]);
        // navigate("/order-confirmation");
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
      toast.error("An error occurred while creating the order. Please try again.");
    }
  };
  return (
    <div className="flex-1 lg:mx-60 sm:mx-24">
      <ToastContainer autoClose={2000}/>
      <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
        <div class="sub-total mb-6">
          <div class=" flex justify-between mb-5">
            <p class="text-xl font-semibold text-black uppercase">Product</p>
            <p class="text-xl font-semibold text-black uppercase">total</p>
          </div>
          <div class="w-full h-[1px] bg-[#EDEDED]"></div>
        </div>

        <div className="product-list w-full mb-[30px]">
          <ul className="flex flex-col space-y-5">
            {selectedCartItems &&
              selectedCartItems.map((item, index) => (
                <li key={index}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-12 w-12 mr-2">
                        <img src={item.product.image} alt={item.product.id} />
                      </div>
                      <div>
                        <h4 className="text-[15px] text-black mb-2.5">
                          {item.product.productName}
                          <span className="text-[13px] text-gray ml-2 mt-2">
                            x{item.quantity}
                          </span>
                        </h4>
                        <p className="text-[13px] text-gray">
                          {item.color.colorName} ,{item.size}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-[15px] text-black font-medium">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div class="w-full h-[1px] bg-[#EDEDED]"></div>
        <div class="mt-[30px]">
          <div class=" flex justify-between mb-5">
            <p class="text-xl font-semibold text-black">Tiền:</p>
            <p class="text-xl font-medium text-black uppercase">
              ${calculateSubtotal()}
            </p>
          </div>
        </div>

        <div class="w-full mt-8">
          <div class="input-com w-full h-full">
            <label class="input-label capitalize block mb-2 text-black text-xl font-semibold">
              Address
            </label>
            <div class="relative ">
              <input
                type="text"
                placeholder="Your address here"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                class="input-field placeholder:text-sm text-md px-6 text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none h-[50px] w-full border"
              />
            </div>
          </div>
        </div>

        <div class="w-full mt-[30px]">
          <div class="sub-total mb-6">
            <span class="text-xl font-semibold text-black mb-3 block">
              Phí vận chuyển:
            </span>
            <div class=" flex justify-between mb-5">
              <p class="text-base font-medium text-black">Free Shipping</p>
              <p class="text-xl font-medium text-black">+$0</p>
            </div>
            <div class="w-full h-[1px] bg-[#EDEDED]"></div>
          </div>
        </div>

        <div className="mt-[30px] ">
          <div className="flex justify-between mb-5">
            <p className="text-xl font-semibold text-black">Tổng tiền:</p>
            <p className="text-xl font-medium text-qred">
              ${calculateSubtotal()}
            </p>
          </div>
          <div class="w-full h-[1px] bg-[#EDEDED]"></div>
        </div>

        <div className="shipping mt-[30px]">
          <p className="text-xl font-semibold text-black">
            Hình thức thanh toán:
          </p>
          <ul class="flex flex-col space-y-1">
            <li>
              <div class="flex space-x-2.5 items-center mb-5">
                <div class="input-radio">
                  <input
                    type="radio"
                    name="price"
                    class="accent-pink-500"
                    id="delivery"
                    checked={true}
                  />
                </div>
                <label
                  for="delivery"
                  class="text-[18px] text-normal text-black"
                >
                  Cash on Delivery
                </label>
              </div>
            </li>
          </ul>
        </div>
        <button onClick={handleCreateOrder} className="w-full h-[50px] bg-gray-900 flex justify-center items-center rounded-md">
            <span className="text-sm font-semibold text-white">
              Place Order Now
            </span>
        </button>
      </div>
    </div>
  );
}
