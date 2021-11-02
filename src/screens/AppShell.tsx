import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { BasicPage } from './BasicPage';
import { YahtzeePage } from './YahtzeePage';

export const AppShell = () => {
  return (
    <Router>
      <Switch>
        <Route path="/basic/:gameId">
          <BasicPage />
        </Route>
        <Route path="/yahtzee/:gameId">
          <YahtzeePage />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
