import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, useEffect,useMemo} from "react";
import { useParams } from 'react-router-dom';
import { get, remove} from "../../../utils/ApiUltils";
import { API_URLS } from "../../../api/Api";
import { requestSort, sortData } from '../../../utils/sortUtils';
import {faFilter,faPenToSquare,faTrash,} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../components/Common/Pagination";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtils";
import { ToastContainer} from 'react-toastify';
const Inventory = () => {
    const { warehouseId } = useParams();
    const [useProduct, setProduct] = useState([]);
    const [usePage,setPage]= useState({
        totalPages: 0,
        currentPage: 0,
        pageSize: 10,
    });  
    const [sortConfig, setSortConfig] = useState({
      key: '',
      direction: '',
    });
    
    useEffect(() => {
      const fetchData = async(page)=>{
        try {
          if (warehouseId) {
            const response = await get(API_URLS.getProductFromWarehouse + `/${warehouseId}?page=${usePage.currentPage}`)
            setProduct(response.content);
            const pageInfor = {
              totalPages: response.totalPages,
              currentPage: response.number,
              pageSize: response.size,
            }
            setPage(pageInfor);
          }
        }catch(e) {
            console.error('Lỗi trong quá trình lấy dữ liệu từ API:', e);
        }
      }
      fetchData(usePage.currentPage);
      
    },[usePage.currentPage,warehouseId]);
    const handlePageChange = (newPage) => {
      setPage({
        ...usePage,
        currentPage: newPage,
      });
    };
    const handleDelete = async(productdetailId) => {
      try {
        setProduct((prevProducts) =>
          prevProducts.filter((product) => product.productdetailId !== productdetailId)
        );
        await remove(API_URLS.deleteProductDetail + `/${productdetailId}/delete`);
        await  showSuccessToast('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        await showErrorToast('Error deleting product');
      }
    };
    const handleSort = (key) => {
      requestSort(key, sortConfig, setSortConfig);
    };
    
    const sortedProducts = useMemo(() => {
      return sortData(useProduct, sortConfig);
    }, [useProduct, sortConfig]);
  return (
    <>
    <ToastContainer />
      <div className="flex items-center justify-between mb-4\">
      
        <div className="bg-white mb-6">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <div className="flex items-center mb-6">
            <select className="block w-52 h-10 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 my-auto">
                <option defaultValue=''>Choose category</option>
                <option value="US">Áo thun</option>
                <option value="CA">Quẩn dài</option>
                <option value="FR">Quần jean</option>
                <option value="DE">Áo khoác</option>
            </select>
            <select className="block w-52 h-10 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 my-auto">
                <option defaultValue=''>Choose warehouse</option>
                <option value="US">Kho Linh Trung</option>
                <option value="CA">Kho Thảo Điền</option>
            </select>
            <button className="w-12 bg-blue-500 rounded-md h-9 active:bg-slate-500 hover:bg-blue-600 transition-all">
                <FontAwesomeIcon
                  icon={faFilter}
                  style={{ color: "#ffffff" }}
                />
            </button>
        </div>
        
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  ID
                  <button onClick={() => handleSort('productdetailId')}>
                    <svg
                      className="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">
                  Image
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Productname
                  <button onClick={() => handleSort('productName')}>
                    <svg
                      className="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Color
                  <button onClick={() => handleSort('colorName')}>
                    <svg
                      className="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Size
                  <button onClick={() => handleSort('sizeName')}>
                    <svg
                      className="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">
                  Category
                  <button onClick={() => handleSort('category')}>
                    <svg
                      className="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">
                  Status
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">
                  Price
                  <button onClick={() => handleSort('purchasePrice')}>
                    <svg
                      className="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={index} className="bg-white border-b text-gray-700 text-lg">
                <td className="px-6 py-4">{product.productdetailId}</td>
                <td className="px-6 py-4 flex justify-center">
                  <img href={product.imageProducts} alt="product" className="w-10 h-10"/>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.productName}</td>
                <td className="px-6 py-4">{product.colorName}</td>
                <td className="px-6 py-4">{product.sizeName}</td>
                <td className="px-6 py-4 text-center">{product.category}</td>
                <td className="px-6 py-4 text-center">{product.stockQuantity}</td>
                <td className="px-6 py-4 text-center">{product.prices[product.prices.length - 1].purchasePrice}</td>
                <td className="px-6 py-4">
                  <button className="mx-2 font-medium text-blue-600">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#ff9b00" }}
                    />
                  </button>
                  <button onClick={()=>handleDelete(product.productdetailId)} className="mx-2 font-medium text-blue-600">
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#ff0000" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
        <Pagination
                    totalPages={usePage.totalPages}
                    currentPage={usePage.currentPage}
                    onPageChange={handlePageChange}
                />
        </div>        
      </div>
    </>
  );
};
export default Inventory;
