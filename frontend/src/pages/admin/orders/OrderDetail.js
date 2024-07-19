import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShip } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/header/HeaderAdmin";
import { AdminContext } from "../../../contexts/AdminContext";
import { toast, ToastContainer } from "react-toastify";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const { getOrderById, updateOrderStatus } = useContext(AdminContext);
  const [currentStatus, setCurrentStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  const fetchOrderDetails = async () => {
    try {
      const response = await getOrderById(orderId); // Adjust the API endpoint as needed
      console.log(response);
      setOrderDetails(response);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleStatusUpdate = async () => {
    if (newStatus !== currentStatus) {
      try {
        await updateOrderStatus(orderId, newStatus);
        setCurrentStatus(newStatus);
        toast.success('Done!')
      } catch (error) {
        console.error("Error updating order status:", error);
        // Revert the status change in the UI if the API call fails
        setNewStatus(currentStatus);
      }
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="top-0 sticky z-50">
        <Header />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden container mx-auto">
        <ToastContainer autoClose={2000}/>
        {/* Order Header */}
        <div className="bg-gray-100 px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Order {orderDetails.id}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
            {orderDetails.status} /{" "}
            {new Date(orderDetails.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex">
          <div className="w-3/4">
            {/* Order Details */}
            <div className="px-4 py-5 sm:p-6">
              {/* Products */}
              <div className="bg-white shadow-md rounded-md p-4">
                <div className="grid grid-cols-5 gap-5 mb-4 font-semibold">
                  <div className="col-span-2">PRODUCT#</div>
                  <div>PRICE</div>
                  <div>QUANTITY</div>
                  <div>TOTAL</div>
                </div>
                {orderDetails.orderdetails.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-5 items-center mb-2"
                  >
                    <div className="flex items-center col-span-2">
                      <div className="w-12 h-12 bg-gray-300 mr-4"></div>
                      <div>
                        <h3 className="font-semibold">
                          {item.productDetailId}
                        </h3>
                      </div>
                    </div>
                    <div>${item.unitPrice.toFixed(2)}</div>
                    <div>{item.quantity}</div>
                    <div>${(item.unitPrice * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="flex mt-4">
                {/* Shipping */}
                <div className="w-1/2 border round-md mr-2 p-4">
                  <h4 className="text-2xl leading-6 font-medium text-gray-900 mb-2">
                    Shipping
                  </h4>
                  <div className="flex items-center justify-around mt-8">
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <FontAwesomeIcon icon={faShip} size="lg" />
                      </div>
                      <div>
                        <h5 className="text-lg leading-5 font-medium text-gray-900">
                          Standard Shipping
                        </h5>
                        <p className="text-lg leading-5 text-gray-500">
                          Delivery address: {orderDetails.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="w-1/2 round-md border p-4 ml-2">
                  <h4 className="text-2xl leading-6 font-medium text-gray-900 mb-2">
                    Payment Summary
                  </h4>
                  <div className="border-gray-200 pt-2">
                    <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                      <p className="text-base leading-6 font-medium text-gray-900">
                        Total
                      </p>
                      <p className="text-base leading-6 font-medium text-gray-900">
                        ${orderDetails.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 p-4">
            {/* Customer Details */}
            <div className="mb-10">
              <h4 className="text-2xl leading-6 font-medium text-gray-900 mb-2">
                Customer
              </h4>
              <div className="flex items-center">
                {/* Customer Avatar */}
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  {orderDetails.user.image ? (
                    <img
                      src={orderDetails.user.image}
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="2xl" />
                  )}
                </div>
                <div>
                  <h5 className="text-sm leading-5 font-medium text-gray-900">
                    {orderDetails.user.name}
                  </h5>
                  <p className="text-sm leading-5 text-gray-500">
                    {orderDetails.user.email}
                  </p>
                  <p className="text-sm leading-5 text-gray-500">
                    {orderDetails.user.phone}
                  </p>
                </div>
              </div>
            </div>
            {/* Address */}
            <div className="mb-10">
              <h4 className="text-2xl leading-6 font-medium text-gray-900 mb-2">
                Shipping Address
              </h4>
              <p className="text-sm leading-5 text-gray-500">
                {orderDetails.address}
              </p>
            </div>

            <div>
              <label
                htmlFor="status"
                className="text-2xl leading-6 font-medium text-gray-900 mb-2"
              >
                Status:
              </label>
              <div className="flex items-center justify-between">
                <select
                  id="status"
                  value={newStatus}
                  onChange={handleStatusChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md border"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={handleStatusUpdate}
                  className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={newStatus === currentStatus}
                >
                  APLY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
