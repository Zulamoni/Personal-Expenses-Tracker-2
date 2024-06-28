import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import budgetService from './budgetService';

const BudgetList = () => {
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Budget List</Typography>
      <Button component={Link} to="/budgets/new" variant="contained" color="primary" sx={{ mb: 3 }}>Add New Budget</Button>
      <List>
        {budgets.map(budget => (
          <ListItem key={budget.id} disablePadding>
            <ListItemText primary={`${budget.title} - ${budget.amount} - ${budget.category}`} />
            <Button onClick={() => handleDelete(budget.id)} variant="contained" color="secondary">Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BudgetList;
