/* eslint-disable react/jsx-one-expression-per-line */
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
  instance,
}) => {
  const [nameValue, setNameValue] = useState('');
  const [labels, setLabels] = useState(null);
  const timer = useRef();


  const selectLabel = ({ id, name }) => {
    setNameValue('');
    addLabel({ id, name });
  };

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
    if (nameValue) {
      timer.current = setTimeout(() => {
        getData();
      }, 500);
    } else {
      setLabels(null);
    }
  }, [nameValue]);

  const addNew = async () => {
    const response = await postLabels(nameValue);
    if (response) {
      const { _id, name } = response;
      selectLabel({ id: _id, name });
    }
  };

  const newTagLine = (
    <button type="button" onClick={() => addNew()}>
      <span><i className="fas fa-plus" /> Dodaj nowy tag:</span>
      <strong> {nameValue}</strong>
    </button>
  );

  return (
    <div className="labels__finder">
      <Input
        type="text"
        value={nameValue}
        name="tagName"
        id={`tagName_${instance}`}
        onChange={(target) => setNameValue(target.value)}
      />
      {
        labels || nameValue !== ''
          ? (
            <ul className="labels__list">
              {
                labels
                  ? (
                    <>
                      {
                        labels.map((label, index) => (
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
                        ))
                      }
                      {
                        !labels.filter((label) => (
                          label.name.toLowerCase() === nameValue.toLowerCase()
                        )).length
                          ? newTagLine
                          : null
                      }
                    </>
                  )
                  : newTagLine
              }
            </ul>
          )
          : null
      }
    </div>
  );
};

export default LabelFinder;
