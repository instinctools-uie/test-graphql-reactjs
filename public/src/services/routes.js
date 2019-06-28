import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATHS } from '../constants';
import { App, NotFoundPage, Employees } from '../containers';

export const Routes = () => (
  <App>
    <Switch>
      <Route exact path={PATHS.overview.path} component={Employees} />
      <Route component={NotFoundPage} />
    </Switch>
  </App>
);
