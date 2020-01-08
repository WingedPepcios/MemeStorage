/* eslint-disable react/jsx-props-no-spreading */
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
  legend,
  ...args
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
      {...args}
    />
    {children && (type === 'radio' || type === 'checkbox') ? (
      <label htmlFor={id} className={`form__label ${value ? '--active' : ''}`}>
        {children}
      </label>
    ) : null}
    {
      legend
        ? <p className="form__legend">{legend}</p>
        : null
    }
  </div>
);

export default Input;
