import logo1 from "../../assets/icon/tshirt.png";
const ListTopUser = () => {
  const data = [
    {
      id: "asm-10",
      Product: "Ao sơ mi",
      Price: 13,
      Sales: 450,
      Logo: logo1,
    },  
    {
        id: "asm-20",
        Product: "Ao sơ mi",
        Price: 13,
        Sales: 450,
        Logo: logo1,
      }, 
      {
        id: "asm-30",
        Product: "Ao sơ mi",
        Price: 13,
        Sales: 450,
        Logo: logo1,
      }, 
      {
        id: "asm-40",
        Product: "Ao sơ mi",
        Price: 13,
        Sales: 450,
        Logo: logo1,
      }, 
      {
        id: "asm-50",
        Product: "Ao sơ mi",
        Price: 13,
        Sales: 450,
        Logo: logo1,
      },
  ];
  return (
    <>
      <div className="rounded-t p-2 bg-gray-50">
        <div className="text-xl p-2 font-semibold text-gray-800">Top products</div>
        <span className="text-sm p-2 text-gray-600">From 21 July to 25 Aug</span>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">
              ID
            </th>
            <th scope="col" className="px-2 py-3">
              Product
            </th>
            <th scope="col" className="px-2 py-3">
              Price
            </th>
            <th scope="col" className="px-2 py-3">
              Sales
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-2 py-4">{product.id}</td>
              <th
                scope="row"
                className="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={product.Logo}
                  alt="Jese"
                />
                <div className="pl-3">{product.Product}</div>
              </th>
              <td className="px-2 py-4">${product.Price}</td>
              <td className="px-2 py-4">{product.Sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ListTopUser;
