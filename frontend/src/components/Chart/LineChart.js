// import React, { useEffect } from "react";
// import ApexCharts from "apexcharts";
// const LineChart = () => {
//   useEffect(() => {
//     window.addEventListener("load", function () {
//       let options = {
//         xaxis: {
//           show: true,
//           categories: [
//             "01 Feb",
//             "02 Feb",
//             "03 Feb",
//             "04 Feb",
//             "05 Feb",
//             "06 Feb",
//             "07 Feb",
//           ],
//           labels: {
//             show: true,
//             style: {
//               fontFamily: "Inter, sans-serif",
//               cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
//             },
//           },
//           axisBorder: {
//             show: false,
//           },
//           axisTicks: {
//             show: false,
//           },
//         },
//         yaxis: {
//           show: true,
//           labels: {
//             show: true,
//             style: {
//               fontFamily: "Inter, sans-serif",
//               cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
//             },
//             formatter: function (value) {
//               return "$" + value;
//             },
//           },
//         },
//         series: [
//           {
//             name: "Developer Edition",
//             data: [150, 141, 145, 152, 135, 125],
//             color: "#1A56DB",
//           },
//           {
//             name: "Designer Edition",
//             data: [43, 13, 65, 12, 42, 73],
//             color: "#7E3BF2",
//           },
//         ],
//         chart: {
//           sparkline: {
//             enabled: false,
//           },
//           height: "75%",
//           width: "100%",
//           type: "area",
//           fontFamily: "Inter, sans-serif",
//           dropShadow: {
//             enabled: false,
//           },
//           toolbar: {
//             show: false,
//           },
//         },
//         tooltip: {
//           enabled: true,
//           x: {
//             show: false,
//           },
//         },
//         fill: {
//           type: "gradient",
//           gradient: {
//             opacityFrom: 0.55,
//             opacityTo: 0,
//             shade: "#1C64F2",
//             gradientToColors: ["#1C64F2"],
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         stroke: {
//           width: 6,
//         },
//         legend: {
//           show: false,
//         },
//         grid: {
//           show: false,
//         },
//       };
//       const chartElement = document.getElementById("labels-chart");
//       if (chartElement && typeof ApexCharts !== "undefined") {
//         const chart = new ApexCharts(chartElement, options);
//         chart.render();
//       }      
//     });
//   }, []);
//   return (
//     <>
//       <div className="min-w-max bg-white rounded-lg shadow dark:bg-gray-800">
//         <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
//           <div className="flex items-baseline">
//             <h5 className="text-3xl font-bold text-gray-900 dark:text-white pb-2">
//               $12,423
//             </h5>
//             <p className="text-base font-normal text-gray-500 dark:text-gray-400 mx-2">
//               Sales this week
//             </p>
//           </div>
//         </div>
//         <div id="labels-chart" className="px-2.5 labels-chart"></div>
//       </div>
//     </>
//   );
// };
// export default LineChart;
