import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LOGIN_PAGE } from './Types/Routes';
import Login from './Layouts/Login';

import 'bootstrap/dist/css/bootstrap-grid.min.css';

const MemesApp = () => (
  <Router>
    <Switch>
      <Route path={LOGIN_PAGE}>
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default MemesApp;
