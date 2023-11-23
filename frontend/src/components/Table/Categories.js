import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Common/Pagination";
import CateModal from "../../models/CateModal";
const Categories = () => {
  const data = [
    { id: "ABC11", category: "Áo sơ mi trắng cổ điển" , parent:"Áo sơ mi nam"},
    { id: "ABC22", category: "Áo sơ mi trắng slim fit", parent:"Áo sơ mi nam" },
    { id: "DEF11", category: "Áo thun Trơn" , parent:"Áo thun nam"},
    { id: "XYZ11", category: "Áo khoác da", parent:"Áo khoác nam" },
  ];
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
      <div className="font-semibold text-xl">Categories</div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Parent Category
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3 w-32">
                <div>
                  <button className="rounded-md p-2 text-base w-20 text-white bg-green-400 transition-all hover:scale-105 font-semibold">
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#ffffff" }}
                      size="sm"
                    />
                    Add
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((pros)=>(
              <tr key={pros.id} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">{pros.id}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {pros.category}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {pros.parent}
              </th>
              <td className="px-6 py-4">
              <CateModal categoryValue={pros} />
              </td>
              <td className="px-6 py-4">
                <button className="rounded-md text-base p-2 w-20 text-white bg-red-400 transition-all hover:scale-105 font-semibold">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ color: "#ffffff" }}
                      size="lg"
                    />
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>        
        <div className="justify-center flex"><Pagination /> </div>   
      </div>
    </>
  );
};
export default Categories;
