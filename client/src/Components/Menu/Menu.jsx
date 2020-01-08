/* eslint-disable react/prop-types */
import React, { useState, Children, cloneElement } from 'react';
import { useLocation } from 'react-router-dom';

import './Menu.scss';

const Menu = ({
  children,
  baseActive,
  type,
}) => {
  const [active, setActive] = useState(baseActive || 0);
  const currentLocation = useLocation();

  return (
    <nav className="nav">
      {
        Children.map(children, (child, i) => {
          if (child) {
            if (type === 'byLink') {
              const { to } = child.props;
              return cloneElement(child, {
                type: 'link',
                isActive: to === currentLocation.pathname,
                key: i,
              });
            }
            return cloneElement(child, {
              key: i,
              isActive: active === i,
              onClick: () => setActive(i),
            });
          }
          return null;
        })
      }
    </nav>
  );
};

export default Menu;
