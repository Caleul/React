import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import AuthActions from '~/store/ducks/auth';

import { Container, PhotoDiv, FormDiv, Form } from './styles';
import loginImage from '../../assets/loginPage/slack-trello-screens-by-oblik-studio.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      dispatch(AuthActions.logInRequest(username, password));
    },
    [dispatch, password, username]
  );

  return (
    <Container>
      <PhotoDiv>
        <h1>Sistema de Controle</h1>
        <div>
          <img src={loginImage} alt="loginImage" />
        </div>
      </PhotoDiv>
      <FormDiv>
        <h1>Sua Conta</h1>
        <Form onSubmit={handleSubmit}>
          <span>Usuario</span>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
          <span>Senha</span>
          <input
            type="password"
            placeholder="Repita a senha"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Entrar</button>
        </Form>
        <p>© 2020.</p>
      </FormDiv>
    </Container>
  );
};

export default Login;
