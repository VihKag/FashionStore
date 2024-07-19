import { Outlet } from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import HeaderClient from "../../components/header/HeaderClient";
import DiscountBanner from "../../components/Discount";
import Footer from "../../components/Footer";

const UserLayout = () => {
  return (
    <div>
      <HeaderClient />
      <main>
        <Outlet />
      </main>
      <div>
        <DiscountBanner />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
