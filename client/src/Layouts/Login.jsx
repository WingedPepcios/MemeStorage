import React, { useState, useCallback } from 'react';

import Form from '../Components/Form';
import { Input } from '../Components/Input';
import { formValidate } from '../Utils/FormUtils';
import http from '../Utils/Instance';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      formValidate();
      const userData = await http.post('/api/users', {
        username: username.value,
        password: password.value,
      });
      console.log(userData);
    },
    [username, password],
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
