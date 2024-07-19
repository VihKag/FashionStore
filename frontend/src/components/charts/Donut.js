import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';

const Donut = ({ donData }) => {
  const chartData = useMemo(() => {
    if (!donData) return { options: {}, series: [], labels: [] };

    const { ordersByStatus, totalOrders } = donData;
    const labels = Object.keys(ordersByStatus);
    const series = Object.values(ordersByStatus);

    return {
      options: {
        labels: labels,
        title: {
          text: `Total Orders: ${totalOrders}`
        }
      },
      series: series,
      labels: labels
    };
  }, [donData]);

  return (
    <div className="donut">
      <Chart 
        options={chartData.options} 
        series={chartData.series} 
        type="donut" 
        width="540" 
      />
    </div>
  );
};

export default Donut;