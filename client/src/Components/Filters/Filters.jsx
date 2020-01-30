/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

// import history from '../../Utils/history';
import Filter from './Filter';

const Filters = ({
  user,
  filters,
}) => {
  const [labelsList, setLabelList] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const FiletrsApi = useRef({});
  const { search } = useLocation();
  const history = useHistory();


  const sortArrayByActive = (a, b) => ((a.isActive === b.isActive) ? 0 : a.isActive ? -1 : 1);

  useEffect(() => {
    if (filters) {
      const { labels } = filters;
      if (labels) {
        // setFilterList((state) => ({ ...state, labels: labels.map(() => ) }))
        setLabelList(labels.sort(sortArrayByActive));
      }
    }
  }, [filters]);

  useEffect(() => {
    if (isChanged) {
      clearTimeout(FiletrsApi.current.timer);
      FiletrsApi.current.timer = setTimeout(() => {
        const activeLabelsList = labelsList.filter((label) => label.isActive === true);
        // const { pathname } = history.location;
        if (activeLabelsList.length) {
          const labelsQuery = activeLabelsList.map((label) => label.name).join(',');
          const query = queryString.parse(search, { arrayFormat: 'comma' });
          query.labels = labelsQuery;

          history.push({ search: queryString.stringify(query, { arrayFormat: 'comma' }) });
        } else {
          history.push({ search: '' });
        }
      }, 500);
    }
  }, [isChanged, labelsList, history, search]);

  const changeInputValue = ({ name, value }) => {
    setLabelList((state) => state.map((label) => {
      if (label.name === name) {
        return { name, isActive: value };
      }
      return label;
    }).sort(sortArrayByActive));
    setIsChanged(true);
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
