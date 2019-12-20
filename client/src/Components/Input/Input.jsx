import React, { useState } from 'react';

import './Input.scss';

const Input = ({
  classes,
  type,
  name,
  value,
  onChange,
  children,
  id,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target);
    }
  }

  return (
    <div className={`form__group --${type} ${classes}`}>
      {children ? (
        <label htmlFor={id} className={`form__label ${inputValue ? '--active' : ''}`}>
          {children}
        </label>
      ) : null}
      <input
        id={id}
        className="form__input"
        type={type}
        value={inputValue}
        name={name}
        onChange={(e) => onChangeInput(e)}
      />
    </div>
  );
};

export default Input;
