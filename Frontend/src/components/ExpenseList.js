import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import expenseService from './expenseService';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    expenseService.getAllExpenses()
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  };

  const handleDelete = (id) => {
    expenseService.deleteExpense(id)
      .then(() => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  return (
    <div>
      <h2>Expense List</h2>
      <Link to="/expenses/new">Add New Expense</Link>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            <Link to={`/expenses/${expense.id}`}>{expense.title}</Link> - {expense.amount} - {expense.category}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
