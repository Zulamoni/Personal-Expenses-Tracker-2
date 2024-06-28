import React, { useEffect, useState } from 'react';
import budgetService from './budgetService';

const BudgetComponent = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = () => {
    budgetService.getAllBudgets()
      .then(response => {
        setBudgets(response.data);
      })
      .catch(error => {
        console.error('Error fetching budgets:', error);
      });
  };

  const handleDelete = (id) => {
    budgetService.deleteBudget(id)
      .then(() => {
        setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
      })
      .catch(error => {
        console.error('Error deleting budget:', error);
      });
  };

  return (
    <div>
      <h2>Budget List</h2>
      <ul>
        {budgets.map(budget => (
          <li key={budget.id}>
            {budget.title} - {budget.amount} - {budget.category}
            <button onClick={() => handleDelete(budget.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetComponent;
