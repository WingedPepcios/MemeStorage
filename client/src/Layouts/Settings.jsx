import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Form from '../Components/Form';
import { Input } from '../Components/Input';
import { postUpdateUser } from '../Actions';

const Settings = () => {
  const { user } = useSelector((state) => state);
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { username } = user;
      const response = await postUpdateUser({ password, passwordRepeat, username });
      if (response) {
        setPassword('');
        setPasswordRepeat('');
      }
    },
    [password, passwordRepeat],
  );

  return (
    <div>
      <h2 className="mb-5">Ustawienia konta</h2>
      <Form onSubmit={handleSubmit} classes="row">
        <div className="headline col-12 mb-4">Zmiana hasła</div>
        <div className="col-12 col-sm-7">
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(target) => setPassword(target.value)}
          >
            Hasło
          </Input>
        </div>
        <div className="col-12 col-sm-7">
          <Input
            name="passwordRepeat"
            type="password"
            value={passwordRepeat}
            onChange={(target) => setPasswordRepeat(target.value)}
            legend="Hasło powinno składać się z conajmniej 10 znaków!"
          >
            Powtórz hasło
          </Input>
        </div>
        <div className="col-12 col-sm-7">
          <button type="submit" className="btn --solid">Zmień</button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
