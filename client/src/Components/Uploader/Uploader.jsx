/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState,
  useCallback,
  // useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Form from '../Form';
import { Input } from '../Input';
import { postMeme } from '../../Actions';
import { dispatchMemes } from '../../Actions/Dispatch';

import './Uploader.scss';
import { useLabels } from '../Label';
import { useImageInput } from '../../Atoms/useImageInput';

const Uploader = () => {
  const [memePrivileges, setMemePrivileges] = useState('0');
  const [memeTitle, setMemeTitle] = useState('');
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [imageRef, image, clearImage] = useImageInput({ title: 'Dodaj zdjęcie', alt: 'Zaktualizuj zdjęcie' });

  const {
    Labels,
    List,
    setList,
  } = useLabels({
    labels: [],
    instance: 0,
  });

  const handleChange = (target) => {
    setMemePrivileges(target.value);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append('meme', imageRef.current.files[0]);
      data.append('setPrivileges', memePrivileges);
      data.append('title', memeTitle);
      data.append('tags', JSON.stringify(List));

      const response = await postMeme(data);
      if (response) {
        setMemePrivileges('0');
        setMemeTitle('');
        clearImage('');
        setList([]);
        imageRef.current.value = null;

        const query = queryString.parse(search, { arrayFormat: 'comma' });
        dispatch(dispatchMemes(query, user.username));
      }
      // TODO - Alerty!
    },
    [memePrivileges, memeTitle, imageRef, List, setList, dispatch, user.username, clearImage, search],
  );

  const showPrivilegesData = () => {
    const privileges = [(
      <Input
        key={0}
        type="radio"
        id="setPrivileges_0"
        name="setPrivileges"
        value="0"
        checked={memePrivileges === '0'}
        onChange={handleChange}
      >
        Domyślne
      </Input>
    )];
    if (user.privileges >= 1) {
      privileges.push(
        <Input
          key={1}
          type="radio"
          id="setPrivileges_1"
          name="setPrivileges"
          value="1"
          checked={memePrivileges === '1'}
          onChange={handleChange}
          legend="* Tylko dla sprawdzonych osób"
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
          id="setPrivileges_2"
          name="setPrivileges"
          value="2"
          checked={memePrivileges === '2'}
          onChange={handleChange}
          legend="** Totalne niebezpieczeństwo jeśli wycieknie!"
        >
          Ostrożnie!
        </Input>,
      );
    }
    return privileges;
  };

  return (
    <Form classes="uploader row mx-0 py-4" onSubmit={handleSubmit}>
      <div className="col-12 headline">Dodaj Mem</div>
      <div className="col-12 col-sm-6">
        <Input
          name="title"
          type="text"
          value={memeTitle}
          onChange={(target) => setMemeTitle(target.value)}
          autoComplete="off"
        >
          Nagłówek mema
        </Input>
        <Labels />
        {
          user && user.privileges
            ? (
              <div className="form__group_radio">
                <div className="headline">Uprawnienia dostepu</div>
                { showPrivilegesData() }
              </div>
            )
            : null
        }
      </div>
      <div className="col-12 col-sm-6">
        {image}
      </div>
      <div className="col-12">
        <button className="btn --solid" type="submit">Udostępnij</button>
      </div>
    </Form>
  );
};

export default Uploader;
