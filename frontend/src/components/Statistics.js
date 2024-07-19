// src/components/Statistics.js
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../contexts/AdminContext';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {getRevenueStatistics} = useContext(AdminContext);
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getRevenueStatistics(null, null, 2024);
        setStatistics(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full"><div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Revenue Statistics</h2>
        <p>Total Revenue: ${statistics.totalRevenue.toFixed(2)}</p>
        <p>Total Orders: {statistics.totalOrders}</p>
        <p>Average Order Value: ${statistics.averageOrderValue.toFixed(2)}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <h2 className="text-2xl font-semibold mb-4">Revenue by Category and Month</h2>
        {Object.entries(statistics.revenueByCategoryAndMonth).map(([category, months]) => (
          <div key={category} className="mb-4">
            <h3 className="text-xl font-medium">{category}</h3>
            {Object.entries(months).map(([month, revenue]) => (
              <p key={month}>
                {month}: ${revenue.toFixed(2)}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
