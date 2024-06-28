import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BudgetForm from './BudgetForm';

const EditBudgetPage = () => {
  const history = useHistory();
  const { id } = useParams(); // Assuming your route has /edit/:id

  const handleCancel = () => {
    history.push('/budgets'); // Navigate back to the budgets list
  };

  const handleSave = (data) => {
    console.log('Saved data:', data);
    history.push('/budgets'); // Navigate to the budgets list after saving
  };

  return (
    <div>
      <h2>Edit Budget</h2>
      <BudgetForm budgetId={id} onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
};

export default EditBudgetPage;
