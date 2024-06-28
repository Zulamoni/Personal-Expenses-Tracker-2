import axios from 'axios';

const API_URL = 'http://localhost:8000/api/dashboard/';  // Replace with your backend API URL

const getDashboardData = () => {
  return axios.get(API_URL);
};

export default getDashboardData;

