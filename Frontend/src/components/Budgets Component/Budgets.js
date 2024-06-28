import React from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import BudgetList from './BudgetList';
import BudgetForm from './BudgetForm';

const Budgets = () => {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`} component={BudgetList} />
        <Route
          path={`${match.path}/new`}
          render={() => <BudgetForm onCancel={() => history.goBack()} onSave={() => history.push('/budgets')} />}
        />
        <Route
          path={`${match.path}/:id`}
          render={({ match }) => (
            <BudgetForm
              budgetId={match.params.id}
              onCancel={() => history.goBack()}
              onSave={() => history.push('/budgets')}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default Budgets;
