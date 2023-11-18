// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardOne from "../Card/CardOne";
import CardTwo from "../Card/CardTwo";
import CardThree from "../Card/CardThree";
import CardFour from "../Card/CardFour";
import ListTopUser from "../List/ListTopUser";
import ListTopProduct from "../List/ListTopProduct";
const Dashboard = () => {
  return (
    <>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mb-4">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-4"></div>
      <div className="grid xl:grid-cols-2 gap-4 mb-4">
        <div className="border-solid border-2 shadow-sm border-gray-200 h-auto items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
          <ListTopProduct />
        </div>
        <div className="border-solid border-2 shadow-sm border-gray-200 h-auto items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
          <ListTopUser />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
