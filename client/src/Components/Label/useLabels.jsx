/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';

import LabelFinder from './LabelFinder';
import Label from './Label';
import './Label.scss';

const useLabels = ({ labels, instance }) => {
  const [labelsList, setLabelList] = useState(labels);
  const labelsRef = React.useRef({});

  const addLabelToList = useCallback(
    ({ id, name }) => {
      setLabelList((state) => {
        const array = state.filter((label) => label.id !== id);
        return [...array, { id, name }];
      });
    },
    [],
  );

  const removeLabelFormList = useCallback(
    (id) => {
      setLabelList((state) => state.filter((label) => label.id !== id));
    },
    [],
  );

  const setList = useCallback(
    (newList) => {
      setLabelList(newList);
    },
    [],
  );

  labelsRef.current.Labels = () => (
    <section className="labels mb-4">
      <div className="labels__headline">Tagi</div>
      <label htmlFor={`tagName_${instance}`} className="labels__wrapper">
        {
          labelsList.length
            ? labelsList.map((label) => (
              <Label
                key={label.id}
                onClick={() => removeLabelFormList(label.id)}
              >
                {label.name}
              </Label>
            ))
            : null
        }
        <LabelFinder addLabel={addLabelToList} instance={instance} />
      </label>
    </section>
  );

  labelsRef.current.List = labelsList;
  labelsRef.current.setList = setList;

  return labelsRef.current;
};

export default useLabels;
