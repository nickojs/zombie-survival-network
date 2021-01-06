import React, { useState } from 'react';
import RegisterForm from './registerForm';
import LoginForm from './loginForm';
import {
  Block, Container, Title, Button, Gradient
} from '../../generalStyles';

enum AuthType {
  LOGIN,
  REGISTER
}

export default () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.REGISTER);

  return (
    <Container>
      <Title>
        Authentication
      </Title>
      <Block>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="button"
            gradient={Gradient.SECONDARY}
            onClick={() => setAuthType(AuthType.REGISTER)}
          >
            Register
          </Button>
          <Button
            type="button"
            gradient={Gradient.SECONDARY}
            onClick={() => setAuthType(AuthType.LOGIN)}
          >
            Login
          </Button>
        </div>
        <div>
          {authType === AuthType.REGISTER && <RegisterForm />}
          {authType === AuthType.LOGIN && <LoginForm />}
        </div>
      </Block>
    </Container>
  );
};
