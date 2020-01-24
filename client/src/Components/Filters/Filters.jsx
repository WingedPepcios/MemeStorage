/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import Filter from './Filter';

const Filters = ({
  user,
  filters,
}) => {
  const [labelsList, setLabelList] = useState([]);

  useEffect(() => {
    if (filters) {
      const { labels } = filters;
      if (labels) {
        // setFilterList((state) => ({ ...state, labels: labels.map(() => ) }))
        setLabelList(labels);
      }
    }
  }, [filters]);

  const changeInputValue = ({ name, value }) => {
    setLabelList((state) => state.map((label) => {
      if (label.name === name) {
        return { name, isActive: value };
      }
      return label;
    }));
  };

  if (user) {
    return (
      <section className="filters">
        <div className="headline">Filters</div>
        <div className="filters__elements">
          {
            labelsList.map(
              (label, index) => (
                <Filter
                  key={index}
                  name={label.name}
                  isActive={label.isActive}
                  onChange={changeInputValue}
                >
                  {label.name}
                </Filter>
              ),
            )
          }
        </div>
      </section>
    );
  }
  return null;
};

export default Filters;
