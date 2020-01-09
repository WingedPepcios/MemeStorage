/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Form from '../Form';
import { Input } from '../Input';
import { postMemeUpdate } from '../../Actions';

import 'react-lazy-load-image-component/src/effects/opacity.css';

const UserMeme = ({
  id,
  url,
  memePrivileges,
  title,
}) => {
  const [priviligesState, setPriviligesState] = useState(memePrivileges.toString());
  const [titleState, setTitleState] = useState(title);
  const { user } = useSelector((state) => state);

  const updateMeme = () => {
    postMemeUpdate(id, {
      title: titleState,
      setPrivileges: priviligesState,
    });
  };

  const showPrivilegesData = () => {
    const privileges = [(
      <Input
        key={0}
        type="radio"
        id={`setPrivileges_for${id}_0`}
        name="setPrivileges"
        value="0"
        checked={priviligesState === '0'}
        onChange={(target) => setPriviligesState(target.value)}
      >
        Domyślne
      </Input>
    )];
    if (user.privileges >= 1) {
      privileges.push(
        <Input
          key={1}
          type="radio"
          id={`setPrivileges_for${id}_1`}
          name="setPrivileges"
          value="1"
          checked={priviligesState === '1'}
          onChange={(target) => setPriviligesState(target.value)}
        >
          Wtajemniczeni
        </Input>,
      );
    }
    if (user.privileges >= 2) {
      privileges.push(
        <Input
          key={2}
          type="radio"
          id={`setPrivileges_for${id}_2`}
          name="setPrivileges"
          value="2"
          checked={priviligesState === '2'}
          onChange={(target) => setPriviligesState(target.value)}
        >
          Ostrożnie!
        </Input>,
      );
    }
    return privileges;
  };

  return (
    <Form classes="user_meme row">
      <div className="col-12 col-sm-6">
        <figure className="user_meme__image">
          <LazyLoadImage
            alt={titleState}
            src={url}
            effect="opacity"
          />
        </figure>
      </div>
      <div className="col-12 col-sm-6">
        <Input
          name="title"
          type="text"
          value={titleState}
          onChange={(target) => setTitleState(target.value)}
          autoComplete="off"
        >
          Nagłówek mema
        </Input>
        {
          user && user.privileges
            ? (
              <div className="form__group_radio">
                <div className="headline">
                  { showPrivilegesData() }
                </div>
              </div>
            )
            : null
        }
        <button type="button" className="btn --solid" onClick={() => updateMeme()}>Aktualizuj!</button>
      </div>
    </Form>
  );
};

export default UserMeme;
