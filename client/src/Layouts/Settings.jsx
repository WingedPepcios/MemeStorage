/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { dispatchUserData } from '../Actions/Dispatch';
import Form from '../Components/Form';
import { Input } from '../Components/Input';
import { postUpdateUser } from '../Actions';
import { useImageInput } from '../Atoms/useImageInput';
import Image from '../Atoms/Image';

const Settings = () => {
  const { user } = useSelector((state) => state);
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [imageRef, image, clearImage] = useImageInput({ title: 'Zmień avatar', alt: 'Zaktualizuj avatar', id: 'avatarImage' });
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { username } = user;

      const data = new FormData();
      if (imageRef.current.files && imageRef.current.files.length) {
        data.append('avatar', imageRef.current.files[0]);
      }
      data.append('password', password);
      data.append('passwordRepeat', passwordRepeat);

      const response = await postUpdateUser(data, username);
      if (response) {
        setPassword('');
        setPasswordRepeat('');
        clearImage('');

        if (imageRef.current.files && imageRef.current.files.length) {
          imageRef.current.value = null;
          dispatch(dispatchUserData());
        }
      }
    },
    [password, passwordRepeat, user, clearImage, dispatch, imageRef],
  );

  return (
    <div>
      <h2 className="mb-5">Ustawienia konta</h2>
      <Form onSubmit={handleSubmit} classes="row">
        <div className="col-12 mb-5">
          <div className="row">
            <div className="headline col-12 mb-4">Zmiana hasła</div>
            <div className="col-12 col-md-6">
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(target) => setPassword(target.value)}
                legend="Hasło powinno składać się z conajmniej 10 znaków!"
              >
                Hasło
              </Input>
            </div>
            <div className="col-12 col-md-6">
              <Input
                name="passwordRepeat"
                type="password"
                value={passwordRepeat}
                onChange={(target) => setPasswordRepeat(target.value)}
              >
                Powtórz hasło
              </Input>
            </div>
          </div>
        </div>
        <div className="col-12 mb-5">
          <div className="headline mb-2">Twój obecny avatar</div>
          <div className="row">
            <label htmlFor="avatarImage" className="settings__user-avatar mb-4 d-block col-12 col-sm-6">
              <Image src={user.avatar} alt="Zmień avatar" />
            </label>
            <div className="col-12 col-sm-6">
              {image}
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-7">
          <button type="submit" className="btn --solid">Wyślij</button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
