import React, { useState } from 'react';

import './Label.scss';
import LabelFinder from './LabelFinder';
import Label from './Label';

const LabelProvider = () => {
  const [labelsList, setLabelList] = useState([]);

  const addLabelToList = ({ id, name }) => {
    const array = labelsList.filter((label) => label.id !== id);
    setLabelList([...array, { id, name }]);
  };

  console.log(labelsList);

  return (
    <section className="labels__provider">
      {
        labelsList.length
          ? labelsList.map((label) => <Label key={label.id}>{label.name}</Label>)
          : null
      }
      <LabelFinder addLabel={addLabelToList} />
    </section>
  );
};

export default LabelProvider;
