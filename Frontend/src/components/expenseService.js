import React, { useEffect, useState } from 'react';
import expensesService from './expensesService';

const ExpensesComponent = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    expensesService.getAllExpenses()
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  };

  const handleDelete = (id) => {
    expensesService.deleteExpense(id)
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
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.title} - {expense.amount} - {expense.category}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesComponent;
