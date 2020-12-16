/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { pageview } from '../../Utils/Analytics';

import { Menu, MenuLink } from '../Menu';
import { LOGIN_PAGE, REGISTER_PAGE, DEFAULT_PAGE, PANEL_PAGE, SETTINGS_PAGE, ADMIN_PAGE } from '../../Types/Routes';
import { logoutUser } from '../../Actions/Dispatch';
import './Header.scss';
import Logo from '../../gfx/logo.png';

const Header = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname);
  }, [location]);

  return (
    <header className="container mb-5">
      <div className="row align-items-center">
        <h1 className="logo col-5 col-sm-5">
          <Link to={DEFAULT_PAGE}>
            {user && user.privileges > 0 ? (
              <img src={Logo} alt="IdoMeme" />
            ) : (
              <>
                <strong className="d-block">MemeStorage</strong>
                <span className="d-block">Memy i nie tylko...</span>
              </>
            )}
          </Link>
        </h1>
        {user && user.username ? (
          <Menu type="byLink">
            <MenuLink to={DEFAULT_PAGE}>Memy</MenuLink>
            <MenuLink to={PANEL_PAGE}>Dashboard</MenuLink>
            <MenuLink to={SETTINGS_PAGE}>Ustawienia</MenuLink>
            {user.isAdmin ? <MenuLink to={ADMIN_PAGE}>Admin</MenuLink> : null}
          </Menu>
        ) : null}
        <div className="account ml-auto">
          {user !== null ? (
            user.username ? (
              <button type="button" onClick={() => dispatch(logoutUser())} className="ml-3 p-3">
                <i className="fas fa-power-off" />
              </button>
            ) : (
              <>
                <Link to={LOGIN_PAGE} className="ml-3 p-3">
                  <i className="fas fa-user" />
                </Link>
                <Link to={REGISTER_PAGE} className="ml-3 p-3">
                  <i className="fas fa-user-plus" />
                </Link>
              </>
            )
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
