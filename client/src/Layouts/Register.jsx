import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from '../Components/Form';
import { Input } from '../Components/Input';

import { postRegisterUser } from '../Actions';
import { SET_USER_DATA } from '../Types/Reducers';
import { LOGIN_PAGE } from '../Types/Routes';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const userData = await postRegisterUser({
        username,
        password,
        passwordRepeat,
      });
      if (!userData.error) {
        dispatch({ type: SET_USER_DATA, payload: userData });
      }
    },
    [username, password, passwordRepeat, dispatch],
  );

  return (
    <Form classes="login__form row align-items-center flex-column" onSubmit={handleSubmit}>
      <h2 className="mb-5">Zaloguj się do systemu</h2>
      <Input
        name="username"
        type="text"
        value={username}
        onChange={(target) => setUsername(target.value)}
        classes="col-12 col-sm-6"
      >
        Login
      </Input>
      <Input
        name="passwordRepeat"
        type="password"
        value={passwordRepeat}
        onChange={(target) => setPasswordRepeat(target.value)}
        classes="col-12 col-sm-6"
        minLength="10"
      >
        Password
      </Input>
      <Input
        name="password"
        type="password"
        value={password}
        onChange={(target) => setPassword(target.value)}
        classes="col-12 col-sm-6"
        legend="Hasło powinno składać się z conajmniej 10 znaków!"
        minLength="10"
      >
        Repeat password
      </Input>
      <div className="col-12 col-sm-6 form__buttons">
        <button type="submit" className="d-block btn --solid mb-4">Zarejestruj się!</button>
        <Link to={LOGIN_PAGE}>lub zaloguj się</Link>
      </div>
    </Form>
  );
};

export default Register;
