import React, { useState, useEffect } from 'react';
import expenseService from './expenseService';

const ExpenseForm = ({ expenseId, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    category: '',
    description: ''
  });

  useEffect(() => {
    if (expenseId) {
      expenseService.getExpenseById(expenseId)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching expense:', error);
        });
    }
  }, [expenseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (expenseId) {
      expenseService.updateExpense(expenseId, formData)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error('Error updating expense:', error);
        });
    } else {
      expenseService.createExpense(formData)
        .then(response => {
          onSave(response.data);
        })
        .catch(error => {
          console.error('Error creating expense:', error);
        });
    }
  };

  return (
    <div>
      <h2>{expenseId ? 'Edit Expense' : 'Create Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
