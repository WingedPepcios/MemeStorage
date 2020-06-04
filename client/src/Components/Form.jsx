import React from 'react';

const Form = ({
  classes,
  id,
  onSubmit,
  children,
}) => (
  <form id={id} onSubmit={onSubmit} className={classes}>
    {children}
  </form>
);

export default Form;
