import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { removeFromCart } from "../../redux/action/CartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const {setSelectedCartItems} = useContext(UserContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedItems, setSelectedItems] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [selectedItems, cartItems]);


  const handleRemoveItem = (productdetailId) => {
    dispatch(removeFromCart(productdetailId));
  };
  const handleItemSelect = (productdetailId) => {
    setSelectedItems(prev => ({
      ...prev,
      [productdetailId]: !prev[productdetailId]
    }));
  };

  const calculateTotal = () => {
    const newTotal = cartItems.reduce((sum, item) => {
      if (selectedItems[item.productdetailId]) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);
    setTotal(newTotal);
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter(item => selectedItems[item.productdetailId]);
    setSelectedCartItems(itemsToCheckout);
  };

  return (
    <div className="cart-page-wrapper w-full bg-white pb-[60px] container mx-auto">
      <div className="w-full">
        <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
          <div className="container-x mx-auto">
            <div className="mb-5">
              <div className="breadcrumb-wrapper font-400 text-[13px] text-qblack mb-[23px]">
                <span>
                  <Link to="/">
                    <span className="mx-1 capitalize">home</span>
                  </Link>
                  <span className="sperator">/</span>
                </span>
                <span>
                  <Link to="/cart">
                    <span className="mx-1 capitalize">cart</span>
                  </Link>
                  <span className="sperator">/</span>
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <h1 className="text-3xl font-semibold text-qblack">Your Cart</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-[23px]">
        <div className="container-x mx-auto">
          <div className="w-full mb-[30px]">
            <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase select-none">
                    <td className="py-4 whitespace-nowrap"></td>
                    <td className="py-4 block whitespace-nowrap ml-8">
                      product
                    </td>
                    <td className="py-4 whitespace-nowrap text-center">
                      color
                    </td>
                    <td className="py-4 whitespace-nowrap text-center">size</td>
                    <td className="py-4 whitespace-nowrap text-center">
                      price
                    </td>
                    <td className="py-4 whitespace-nowrap  text-center">
                      quantity
                    </td>
                    <td className="py-4 whitespace-nowrap  text-center">
                      total
                    </td>
                    <td className="py-4 whitespace-nowrap text-center">
                      delete
                    </td>
                  </tr>
                  {cartItems.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedItems[item.productdetailId] || false}
                          onChange={() => handleItemSelect(item.productdetailId)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-4 w-[380px]">
                        <div className="flex space-x-6 items-center">
                          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED] ml-8">
                            <img
                              src={item.product.image}
                              alt={item.product.productName}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <p className="font-medium text-[15px] text-qblack">
                              {item.product.productName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <div className="flex justify-center items-center">
                          <span
                            className="w-[20px] h-[20px]"
                            style={{ backgroundColor: item.color.colorCode }}
                          ></span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">{item.size}</td>
                      <td className="text-center py-4 px-2">
                        ${item.product.price}
                      </td>
                      <td className="text-center py-4 px-2">{item.quantity}</td>
                      <td className="text-center py-4 px-2">
                        ${item.product.price * item.quantity}
                      </td>
                      <td className="text-center py-4"
                      
                      >
                        <FontAwesomeIcon
                          onClick={() => handleRemoveItem(item.productdetailId)}
                          icon={faXmark}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="w-full sm:flex justify-between">
              <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex">
                <div className="flex-1 h-full">
                  <div className="input-com w-full h-full">
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        placeholder="Discount Code"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none "
                        type="text"
                        value=""
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <button type="button" className="w-[90px] h-[50px] black-btn">
                  <span className="text-sm font-semibold">Apply</span>
                </button>
              </div>
              <div className="flex space-x-2.5 items-center">
                <Link to="/products">
                  <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                    <span className="text-sm font-semibold">
                      Continue Shopping
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="w-full mt-[30px] flex sm:justify-end">
              <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                <div className="sub-total mb-6">
                  <div className=" flex justify-between mb-6">
                    <p className="text-[15px] font-medium text-qblack">
                      Thành tiền
                    </p>
                    <p className="text-[18px] font-medium text-red-500">${total.toFixed(2)}</p>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                </div>
                <div className="shipping mb-6">
                  <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                    Shipping
                  </span>
                  <ul className="flex flex-col space-y-1">
                    <li>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2.5 items-center">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500 scale-125 hover:cursor-pointer"
                            />
                          </div>
                          <div className="text-[13px] text-normal text-gray ">
                            Free Shipping
                          </div>
                        </div>
                        <span className="text-[13px] text-normal text-qgraytwo">
                          +$00.00
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="shipping-calculation w-full mb-3">
                  <div className="title mb-[17px]">
                    <h1 className="text-[15px] font-medium">
                      Calculate Shipping
                    </h1>
                  </div>
                </div>
                <div className="total mb-6">
                  <div className="flex justify-between">
                    <p className="text-[18px] font-medium text-black">
                      Tổng tiền:
                    </p>
                    <p className="text-[18px] font-medium text-red-500">${total.toFixed(2)}</p>
                  </div>
                </div>

                <Link to="/checkout" onClick={handleCheckout}>
                  <div className="w-full bg-blue-500 h-[50px] black-btn flex justify-center items-center rounded-sm">
                    <span className="text-sm font-semibold text-white">
                      THANH TOÁN
                    </span>
                  </div>
                </Link>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
