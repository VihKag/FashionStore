import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgFashion from "../../assets/icon/tshirt.png";
import {
  faEye,
  faFilter,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Common/Pagination";
const Products = () => {
  const data = [
    {
      id: "sp1",
      name: "T-shirt",
      color: "Blue",
      category: "Clothing",
      quantity: 50,
      price: 19.99,
      image: imgFashion,
    },
    {
      id: "sp2",
      name: "Jeans",
      color: "Black",
      category: "Clothing",
      quantity: 30,
      price: 49.99,
      image: imgFashion,
    },
    {
      id: "sp3",
      name: "Sneakers",
      color: "White",
      category: "Shoes",
      quantity: 40,
      price: 59.99,
      image: imgFashion,
    },
    {
      id: "sp4",
      name: "Suit",
      color: "Gray",
      category: "Clothing",
      quantity: 20,
      price: 199.99,
      image: imgFashion,
    },
    {
      id: "sp5",
      name: "Dress Shirt",
      color: "Light Blue",
      category: "Clothing",
      quantity: 60,
      price: 29.99,
      image: imgFashion,
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between mb-4\">
        <div class="bg-white my-auto">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <div className="flex items-center">
            <select class="block w-52 h-10 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 my-auto">
                <option selected>Choose category</option>
                <option value="US">Áo thun</option>
                <option value="CA">Quẩn dài</option>
                <option value="FR">Quần jean</option>
                <option value="DE">Áo khoác</option>
            </select>
            <select class="block w-52 h-10 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 my-auto">
                <option selected>Choose color</option>
                <option value="US">Đỏ</option>
                <option value="CA">Xanh rêu</option>
                <option value="FR">Trắng</option>
                <option value="DE">Xám</option>
            </select>
            <button class="w-14 bg-gray-600 rounded-md h-9">
                <FontAwesomeIcon
                  icon={faFilter}
                  style={{ color: "#ffffff" }}
                  size="xl"
                />
            </button>
        </div>
        
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center justify-center">
                  ID
                  <a href="/#">
                    <svg
                      class="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Productname
                  <a href="/#">
                    <svg
                      class="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center justify-center">
                  Color
                  <a href="/#">
                    <svg
                      class="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center justify-center">
                  Category
                  <a href="/#">
                    <svg
                      class="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center justify-center">
                  Quantity
                  <a href="/#">
                    <svg
                      class="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center justify-center">
                  Price
                  <a href="/#">
                    <svg
                      class="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id} class="bg-white border-b text-gray-700 text-lg">
                <td class="px-6 py-4 text-center">{product.id}</td>
                <th
                  scope="row"
                  class="text-center px-6 flex py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={product.image}
                    alt="Jese"
                  />
                  <div className="pl-3">
                    <div className="font-semibold">{product.name}</div>
                  </div>
                </th>
                <td class="px-6 py-4 text-center">{product.color}</td>
                <td class="px-6 py-4 text-center">{product.category}</td>
                <td class="px-6 py-4 text-center">{product.quantity}</td>
                <td class="px-6 py-4 text-center">{product.price}</td>
                <td class="px-6 py-4">
                  <a href="/#" class="mx-2 font-medium text-blue-600">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#ff9b00" }}
                    />
                  </a>
                  <a href="/#" class="mx-2 font-medium text-blue-600">
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#ff0000" }}
                    />
                  </a>
                  <a href="/#" class="mx-2 font-medium text-blue-600">
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ color: "#000000" }}
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center"><Pagination /></div>        
      </div>
    </>
  );
};
export default Products;
