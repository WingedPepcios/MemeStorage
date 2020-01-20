/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState,
  useCallback,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';

import Form from '../Form';
import { Input } from '../Input';
import { postMeme } from '../../Actions';

import './Uploader.scss';

const Uploader = () => {
  const [memePrivileges, setMemePrivileges] = useState('0');
  const [memeTitle, setMemeTitle] = useState('');
  const [memePreview, setMemePreview] = useState('');
  const memeRef = useRef(null);
  const { user } = useSelector((state) => state);

  const handleChange = (target) => {
    setMemePrivileges(target.value);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append('image', memeRef.current.files[0]);
      data.append('setPrivileges', memePrivileges);
      data.append('title', memeTitle);

      const response = await postMeme(data);
      if (response) {
        setMemePrivileges('0');
        setMemeTitle('');
        setMemePreview('');
        memeRef.current.value = null;
      }
      // TODO - Alerty!
    },
    [memePrivileges, memeTitle, memeRef],
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

  const renderImage = (target) => {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onloadend = function convertToBase64() {
      setMemePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form classes="uploader row" onSubmit={handleSubmit}>
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
        <Input
          name="tags"
          type="text"
          autoComplete="off"
          disabled
        >
          Tagi (wkrótce)
        </Input>
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
      <div className="form__group --file col-12 col-sm-6">
        <label htmlFor="memePicture">
          {
            memePreview
              ? (
                <img src={memePreview} alt={memeTitle} />
              )
              : (
                <span>Dodaj zdjęcie</span>
              )
          }
        </label>
        <input id="memePicture" type="file" ref={memeRef} onChange={(e) => renderImage(e.target)} className="form__input" />
      </div>
      <div className="col-12">
        <button className="btn --solid" type="submit">Udostępnij</button>
      </div>
    </Form>
  );
};

export default Uploader;
