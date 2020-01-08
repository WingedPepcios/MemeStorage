/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const MenuLink = ({
  children,
  isActive,
  onClick,
  type,
  to,
}) => {
  if (type === 'link') {
    return (
      <Link to={to} className={`nav__link ${isActive ? 'active' : ''}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default MenuLink;
