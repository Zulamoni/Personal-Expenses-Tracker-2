import React from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import ExpenseList from './ExpenseList';
import ExpenseForm from './Expense';

const Expenses = () => {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`} component={ExpenseList} />
        <Route path={`${match.path}/new`} render={() => <ExpenseForm onCancel={() => history.goBack()} onSave={() => history.push('/expenses')} />} />
        <Route path={`${match.path}/:id`} render={({ match }) => <ExpenseForm expenseId={match.params.id} onCancel={() => history.goBack()} onSave={() => history.push('/expenses')} />} />
      </Switch>
    </div>
  );
};

export default Expenses;
