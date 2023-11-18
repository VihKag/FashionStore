// import React, { useEffect, useState } from "react";
// import ApexCharts from "apexcharts";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// const ColumnChart = () => {
//   const [totalY, setTotalY] = useState({ totalYSold: 0, totalYReturn: 0 });
//   useEffect(() => {
//     window.addEventListener("load", function () {
//       const options = {
//         colors: ["#31C48D", "#F98080"],
//         series: [
//           {
//             name: "Return",
//             color: "#F98080",
//             data: [
//               { x: "Shirts", y: 31 },
//               { x: "Jeans", y: 52 },
//               { x: "Jackets", y: 63 },
//               { x: "T-shirts", y: 54 },
//               { x: "Sneakers", y: 20 },
//               { x: "Underwear", y: 26 },
//             ],
//           },
//           {
//             name: "Sold",
//             color: "#31C48D",
//             data: [
//               { x: "Shirts", y: 431 },
//               { x: "Jeans", y: 452 },
//               { x: "Jackets", y: 163 },
//               { x: "T-shirts", y: 104 },
//               { x: "Sneakers", y: 220 },
//               { x: "Underwear", y: 256 },
//             ],
//           },
//         ],
//         chart: {
//           type: "bar",
//           width: "100%",
//           fontFamily: "Inter, sans-serif",
//           toolbar: {
//             show: false,
//           },
//         },
//         plotOptions: {
//           bar: {
//             horizontal: false,
//             columnWidth: "50%",
//             borderRadiusApplication: "end",
//             borderRadius: 8,
//           },
//         },
//         tooltip: {
//           shared: true,
//           intersect: false,
//           style: {
//             fontFamily: "Inter, sans-serif",
//           },
//         },
//         states: {
//           hover: {
//             filter: {
//               type: "darken",
//               value: 1,
//             },
//           },
//         },
//         stroke: {
//           show: true,
//           width: 0,
//           colors: ["transparent"],
//         },
//         grid: {
//           show: true,
//           strokeDashArray: 4,
//           padding: {
//             left: 8,
//             right: 8,
//             top: -14,
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         legend: {
//           show: false,
//         },
//         xaxis: {
//           floating: false,
//           labels: {
//             show: true,
//             style: {
//               fontFamily: "Inter, sans-serif",
//               cssClass: "text-xs font-normal fill-black-900 dark:fill-gray-400",
//             },
//           },
//           axisBorder: {
//             show: true,
//           },
//           axisTicks: {
//             show: false,
//           },
//         },
//         yaxis: {
//           show: false,
//         },
//         fill: {
//           opacity: 1,
//         },
//       };
//       const chartElement = document.getElementById("column-chart");
//       if (chartElement && typeof ApexCharts !== "undefined") {
//         const chart = new ApexCharts(chartElement, options);
//         chart.render();
//       }
//       const totalYSold = options.series[0].data.reduce(
//         (sum, item) => sum + item.y,
//         0
//       );
//       const totalYReturn = options.series[1].data.reduce(
//         (sum, item) => sum + item.y,
//         0
//       );
//       setTotalY({ totalYReturn, totalYSold });
//     });
//   }, []);
//   return (
//     <>
//       <div className="min-w-max bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
//         <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center">
//             <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
//               <FontAwesomeIcon icon="fa-solid fa-book" size="2xl" />
//             </div>
//             <div className="pr-2">
//               <h5 className="leading-none text-xl font-bold text-gray-900 dark:text-white pb-1 rounded-md bg-green-400 p-2">
//                 {totalY.totalYSold}/Week
//               </h5>
//             </div>
//             <div>
//               <h5 className="leading-none text-xl font-bold text-gray-900 dark:text-white pb-1 rounded-md bg-red-400 p-2">
//                 {totalY.totalYReturn}/Week
//               </h5>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2">
//           <dl className="flex items-center">
//             <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal mr-1">
//               Money spent:
//             </dt>
//             <dd className="text-gray-900 text-sm dark:text-white font-semibold">
//               $3,232
//             </dd>
//           </dl>
//           <dl className="flex items-center justify-end">
//             <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal mr-1">
//               Conversion rate:
//             </dt>
//             <dd className="text-gray-900 text-sm dark:text-white font-semibold">
//               1.2%
//             </dd>
//           </dl>
//         </div>
//         <div id="column-chart" className="column-chart"></div>
//       </div>
//     </>
//   );
// };
// export default ColumnChart;
