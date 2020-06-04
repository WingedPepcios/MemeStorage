import React from 'react';

import { Input } from '../Input';
import './Filter.scss';

const Filter = ({
  children,
  name,
  onChange,
  isActive,
}) => (
  <Input
    type="checkbox"
    name={name}
    checked={isActive}
    onChange={(target) => onChange({ name, value: target.checked })}
    classes="filter"
    id={`filter_${name}`}
  >
    {children}
  </Input>
);

export default Filter;
