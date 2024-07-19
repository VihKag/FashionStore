import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  const {selectedCartItems} = useContext(UserContext);
  console.log(selectedCartItems);
  return (
    <div className="w-full pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
            <div className="container-x mx-auto">
              <div className="flex justify-center">
                <h1 className="text-3xl font-semibold text-black">Checkout</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-main-content w-full">
          <div className="container mx-auto">
            <div className="w-full lg:flex lg:space-x-[30px]">
              <OrderSummary props={selectedCartItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
