import axios from 'axios';

const API_URL = 'http://localhost:8000/expenses/';  // Replace with your Django backend URL

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        // Example for JWT authentication:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

axiosInstance.interceptors.response.use(
  response => response.data,  // Handle successful responses globally
  error => {
    console.error('API request failed:', error);
    return Promise.reject(error);  // Handle error responses globally
  }
);

export const getExpenses = () =>
  axiosInstance.get('expenses/')
    .catch(error => {
      console.error('Failed to fetch expenses:', error);
      throw error;  // Propagate the error further
    });

export const addExpense = (expenseData) =>
  axiosInstance.post('expenses/', expenseData)
    .catch(error => {
      console.error('Failed to add expense:', error);
      throw error;  // Propagate the error further
    });

// Add more API functions as needed
