import React from 'react';

import Form from '../Components/Form';
import { Input } from '../Components/Input';

const Login = () => {
  return (
    <div className="login --page">
      <Form classes="login__form">
        <Input name="username" type="text">
          Login
        </Input>
      </Form>
    </div>
  );
};

export default Login;
