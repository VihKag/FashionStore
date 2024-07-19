import React, { useMemo } from "react";
import Chart from "react-apexcharts";

const Column = ({ colData }) => {
  const chartData = useMemo(() => {
    if (!colData) return { options: {}, series: [], labels: [] };

    const { productsByCategory, totalProducts } = colData;
    // const labels = Object.keys(productsByCategory);
    // const series = Object.values(productsByCategory);
    const data = Object.entries(productsByCategory).map(([status, count]) => ({
      x: status,
      y: count,
    }));

    return {
      options: {
        plotOptions: {
          bar: {
            distributed: true,
          },
        },
        chart: {
          type: "bar",
        },
        title: {
          text: `Total : ${totalProducts}`,
          align: "center",
        },
      },
      series: [
        {
          name: "Products",
          data: data,
        },
      ],
    };
  }, [colData]);

  return (
    <div className="donut">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width="820"
      />
    </div>
  );
};

export default Column;
