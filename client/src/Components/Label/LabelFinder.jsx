/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';

import { Input } from '../Input';
import './Label.scss';

import {
  getLabels,
  postLabels,
} from '../../Actions';

const LabelFinder = ({
  addLabel,
}) => {
  const [nameValue, setNameValue] = useState('');
  const [labels, setLabels] = useState(null);
  const timer = useRef();

  useEffect(() => {
    const getData = async () => {
      const response = await getLabels(nameValue);
      if (response) {
        setLabels(response);
      } else {
        setLabels(null);
      }
    };
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (nameValue) {
        getData();
      } else {
        setLabels(null);
      }
    }, 1000);
  }, [nameValue]);

  const onBlur = async () => {
    if (nameValue) {
      // const response = await postLabels(nameValue);
      // if (response) {
      //   const { _id, name } = response;
      //   addLabel({ id: _id, name });
      //   setNameValue('');
      // }
    }
  };

  const selectLabel = ({ id, name }) => {
    addLabel({ id, name });
    setNameValue('');
  };

  return (
    <div className="labels__finder">
      <Input
        type="text"
        value={nameValue}
        name="tagName"
        id="tagName"
        onChange={(target) => setNameValue(target.value)}
        onBlur={() => onBlur()}
      >
        Tagi
      </Input>
      {
        labels
          ? (
            <ul className="labels__list">
              {labels.map((label, index) => (
                <li key={index} className="labels__selector">
                  <button
                    type="button"
                    onClick={() => selectLabel({
                      id: label._id,
                      name: label.name,
                    })}
                  >
                    {label.name}
                  </button>
                </li>
              ))}
            </ul>
          )
          : null
      }
    </div>
  );
};

export default LabelFinder;
