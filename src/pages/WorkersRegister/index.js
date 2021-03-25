import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import history from '~/routes/history';

import WorkersActions from '~/store/ducks/workers';

import {
  Container,
  Content,
  Title,
  Form,
  FormSection,
  Buttons,
  Select,
} from '~/components/RegisterStyles/styles';
import Sidebar from '~/components/Sidebar';
import { Input } from '~/styles/components/Input';
import Button from '~/styles/components/Button';

function WorkersRegister(props) {
  const dispatch = useDispatch();

  const [Username, setUsername] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PassConfirmation, setPassConfirmation] = useState('');
  const [IsAdmin, setIsAdmin] = useState(false);

  const handleSumbit = useCallback(
    e => {
      e.preventDefault();

      const password = 2709;
      const confirmation = prompt('Escreva sua senha');
      if (Number(confirmation) === password) {
        dispatch(
          WorkersActions.addUserRequest(
            Username,
            Name,
            Email,
            Password,
            IsAdmin
          )
        );

        setUsername('');
        setName('');
        setEmail('');
        setPassword('');
        setPassConfirmation('');
        setIsAdmin(false);
      }
    },
    [Email, IsAdmin, Name, Password, Username, dispatch]
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>
          <h1>Registro</h1>
        </Title>
        <Form onSubmit={handleSumbit}>
          <h2>Registro pessoal</h2>
          <FormSection>
            <div>
              <span>Username</span>
              <Input
                placeholder="Username"
                type="text"
                value={Username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <span>Nome</span>
              <Input
                placeholder="Nome"
                type="text"
                value={Name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <span>E-mail</span>
              <Input
                placeholder="E-mail"
                type="email"
                value={Email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </FormSection>
          <h2>Segurança</h2>
          <FormSection>
            <div>
              <span>Senha</span>
              <Input
                placeholder="Senha"
                type="password"
                value={Password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <span>Repita sua senha</span>
              <Input
                placeholder="Senha"
                type="password"
                value={PassConfirmation}
                onChange={e => setPassConfirmation(e.target.value)}
                pattern={Password}
                required
              />
            </div>
            <div>
              <span>Cargo</span>
              <Select
                name="is_admin"
                onChange={e => setIsAdmin(e.target.value)}
                value={IsAdmin}
              >
                <option value="false">Funcionario</option>
                <option value="true">Admin</option>
              </Select>
            </div>
          </FormSection>
          <Buttons>
            <Button
              color="black"
              type="button"
              onClick={() => history.push('/workers')}
            >
              <span>Volver</span>
            </Button>
            <Button type="submit">
              <span>Criar funcionario</span>
            </Button>
          </Buttons>
        </Form>
      </Content>
    </Container>
  );
}

export default WorkersRegister;
