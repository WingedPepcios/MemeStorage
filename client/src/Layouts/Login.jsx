import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../Components/Form';
import { Input } from '../Components/Input';
import { formValidate } from '../Utils/FormUtils';
import { postLoginUser } from '../Actions';
import { SET_USER_DATA } from '../Types/Reducers';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      formValidate();
      const userData = await postLoginUser({
        username: username.value,
        password: password.value,
      });
      if (!userData.error) {
        dispatch({ type: SET_USER_DATA, payload: userData })
      }
    },
    [username, password, dispatch],
  );

  return (
    <div className="login --page">
      <Form classes="login__form" onSubmit={handleSubmit}>
        <Input name="username" type="text" value={username} onChange={setUsername}>
          Login
        </Input>
        <Input name="password" type="password" value={password} onChange={setPassword}>
          Password
        </Input>
        <button type="submit">Log In!</button>
      </Form>
    </div>
  );
};

export default Login;
