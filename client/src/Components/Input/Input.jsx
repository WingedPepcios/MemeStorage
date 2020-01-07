/* eslint-disable react/prop-types */
import React from 'react';

import './Input.scss';

const Input = ({
  classes,
  type,
  name,
  value,
  onChange,
  children,
  id,
  checked,
}) => (
  <div className={`form__group --${type} ${classes ? classes : ''}`}>
    {children && (type !== 'radio' && type !== 'checkbox') ? (
      <label htmlFor={id} className={`form__label ${value ? '--active' : ''}`}>
        {children}
      </label>
    ) : null}
    <input
      id={id}
      className="form__input"
      type={type}
      value={value}
      name={name}
      onChange={(e) => onChange(e.target)}
      checked={checked}
    />
    {children && (type === 'radio' || type === 'checkbox') ? (
      <label htmlFor={id} className={`form__label ${value ? '--active' : ''}`}>
        {children}
      </label>
    ) : null}
  </div>
);

export default Input;
