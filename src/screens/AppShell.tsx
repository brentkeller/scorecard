import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { YahtzeePage } from './YahtzeePage';

export const AppShell = () => {
  return (
    <Router>
      <Switch>
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
