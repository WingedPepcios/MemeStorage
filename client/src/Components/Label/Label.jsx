/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';

const Label = ({
  children,
  onClick,
}) => (
  <span className="label">
    {children}
    {
      onClick
        ? <button type="button" className="ml-3"><i className="fas fa-times" /></button>
        : null
    }
  </span>
);

export default Label;
