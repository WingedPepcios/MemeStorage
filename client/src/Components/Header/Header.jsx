/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOGIN_PAGE } from '../../Types/Routes';
import { logoutUser } from '../../Actions/Dispatch';
import './Header.scss';

const Header = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <header className="container mb-5">
      <div className="row align-items-center">
        <h1 className="logo col-12 col-sm-3">
          <strong className="d-block">MemeStorage</strong>
          <span className="d-block">Memy i nie tylko...</span>
        </h1>
        <div className="account ml-auto">
          {
            user
              ? (
                <button
                  type="button"
                  onClick={() => dispatch(logoutUser())}
                >
                  <i className="fas fa-power-off" />
                </button>
              )
              : (
                <Link to={LOGIN_PAGE}><i className="fas fa-user" /></Link>
              )
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
