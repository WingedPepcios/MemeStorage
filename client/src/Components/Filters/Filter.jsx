import React from 'react';

import { Input } from '../Input';

const Filter = ({
  children,
  name,
  onChange,
  isActive,
}) => (
  <div className="filter">
    <Input
      type="checkbox"
      name={name}
      checked={isActive}
      onChange={(target) => onChange({ name, value: target.checked })}
    >
      {children}
    </Input>
  </div>
);

export default Filter;
