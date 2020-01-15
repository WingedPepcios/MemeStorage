import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from '../Components/Form';
import { Input } from '../Components/Input';
// import { formValidate } from '../Utils/FormUtils';
import { postLoginUser } from '../Actions';
import { SET_USER_DATA } from '../Types/Reducers';
import { REGISTER_PAGE } from '../Types/Routes';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // formValidate();
      const userData = await postLoginUser({
        username,
        password,
      });
      if (!userData.error) {
        dispatch({ type: SET_USER_DATA, payload: userData });
      }
    },
    [username, password, dispatch],
  );

  return (
    <Form classes="login__form row align-items-center flex-column" onSubmit={handleSubmit}>
      <h2 className="mb-5">Zaloguj się do systemu</h2>
      <div className="col-12 col-sm-6">
        <Input
          name="username"
          type="text"
          value={username}
          onChange={(target) => setUsername(target.value)}
        >
          Login
        </Input>
      </div>
      <div className="col-12 col-sm-6">
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(target) => setPassword(target.value)}
        >
          Password
        </Input>
      </div>
      <div className="col-12 col-sm-6 form__buttons">
        <button type="submit" className="d-block btn --solid mb-4">Zaloguj</button>
        <Link to={REGISTER_PAGE}>lub załóż konto</Link>
      </div>
    </Form>
  );
};

export default Login;
