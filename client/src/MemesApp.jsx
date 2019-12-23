import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Login from './Layouts/Login';
import Dashboard from './Layouts/Dashboard';
import { LOGIN_PAGE, PANEL_PAGE } from './Types/Routes';
import { addUserData } from './Actions/Dispatch';

import 'bootstrap/dist/css/bootstrap-grid.min.css';

const MemesApp = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUserData());
  }, [dispatch]);

  if (user) {
    console.log(user);
  }

  return (
    <Router>
      <Switch>
        <Route path={LOGIN_PAGE}>
          { user 
            ? <Redirect to={PANEL_PAGE} />
            : <Login />
          }
        </Route>
        <Route path={PANEL_PAGE}>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default MemesApp;
