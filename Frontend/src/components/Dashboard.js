// Dashboard.js

import React from 'react';
import DashboardChart from './DashboardChart';
import dashboardService from './dashboardService';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = React.useState(null);

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    dashboardService.getDashboardData()
      .then(response => {
        setDashboardData(response.data);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {dashboardData && (
        <div>
          <h2>Overview</h2>
          <p>Total Expenses: {dashboardData.totalExpenses}</p>
          <p>Total Income: {dashboardData.totalIncome}</p>
          {/* Other dashboard overview data */}
          <hr />
          <DashboardChart />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
