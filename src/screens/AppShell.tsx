import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { BasicPage } from './BasicPage';
import { YahtzeePage } from './YahtzeePage';

export const AppShell = () => {
  return (
    <Router>
      <Routes>
        <Route path="basic">
          <Route path=":gameId" element={<BasicPage />} />
        </Route>
        <Route path="yahtzee">
          <Route path=":gameId" element={<YahtzeePage />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
