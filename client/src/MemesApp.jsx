import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Header } from './Components/Header';
import Login from './Layouts/Login';
import Dashboard from './Layouts/Dashboard';
import Main from './Layouts/Main';
import Register from './Layouts/Register';
import ModalProvider from './Components/Modal/ModalProvider';
import {
  LOGIN_PAGE,
  PANEL_PAGE,
  DEFAULT_PAGE,
  REGISTER_PAGE,
} from './Types/Routes';
import { dispatchUserData } from './Actions/Dispatch';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './Styles/defaults.scss';

const MemesApp = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchUserData());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route path={LOGIN_PAGE}>
            {
              user
                ? <Redirect to={PANEL_PAGE} />
                : <Login />
            }
          </Route>
          <Route path={PANEL_PAGE}>
            <Dashboard />
          </Route>
          <Route path={REGISTER_PAGE}>
            {
              user
                ? <Redirect to={PANEL_PAGE} />
                : <Register />
            }
          </Route>
          <Route exact path={DEFAULT_PAGE}>
            <Main />
          </Route>
        </Switch>
      </div>
      {/* Footer here */}
      <ModalProvider />
    </Router>
  );
};

export default MemesApp;
