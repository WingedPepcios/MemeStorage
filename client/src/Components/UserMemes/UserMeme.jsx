/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useModal from '../../Utils/useModal';

import Form from '../Form';
import { Input } from '../Input';
import { Reactions } from '../Reaction';

import { postMemeUpdate, deleteMeme } from '../../Actions';

import 'react-lazy-load-image-component/src/effects/opacity.css';

const UserMeme = ({
  id,
  url,
  memePrivileges,
  title,
  reactions,
}) => {
  const [priviligesState, setPriviligesState] = useState(memePrivileges.toString());
  const [titleState, setTitleState] = useState(title);
  const [deleted, setDeleted] = useState(false);
  const { user } = useSelector((state) => state);

  const updateMeme = () => {
    postMemeUpdate(id, {
      title: titleState,
      setPrivileges: priviligesState,
    });
  };

  const removeMeme = async (argID) => {
    const response = await deleteMeme(argID);
    if (response) {
      setDeleted(true);
    }
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

  const dispatchModal = useModal(removeMeme, id);

  return (
    <>
      {
        !deleted
          ? (
            <Form classes="user_meme row">
              <div className="col-12 col-sm-6 mb-5 mb-sm-0">
                <figure className="user_meme__image mb-3">
                  <LazyLoadImage
                    alt={titleState}
                    src={url}
                    effect="opacity"
                  />
                </figure>
                <Reactions
                  id={id}
                  positive={reactions.positive}
                  negative={reactions.negative}
                />
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
                <div className="d-flex align-items-center">
                  <button type="button" className="btn --solid" onClick={() => updateMeme()}>
                    Aktualizuj!
                  </button>
                  <button type="button" className="btn --danger ml-5" onClick={() => dispatchModal()}>
                    <i className="fas fa-times" />
                    <span className="ml-2">Usuń mem</span>
                  </button>
                </div>
              </div>
            </Form>
          )
          : null
      }
    </>
  );
};

export default UserMeme;
