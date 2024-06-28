import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import dashboardService from './dashboardService';

const DashboardChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    dashboardService.getDashboardData()
      .then(response => {
        const data = response.data;
        // Assuming your data structure is suitable for Chart.js
        const chartData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Expenses',
              data: data.expenses,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
            // Add more datasets as needed
          ],
        };
        setChartData(chartData);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  };

  return (
    <div>
      <h2>Dashboard Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DashboardChart;
