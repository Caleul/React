import React, { Component } from 'react';

import Sidebar from '../../components/Sidebar';
import { Container, Content, Form, SubmitButton, Footer } from './styles';

export default class Contact extends Component {
  state = {
    name: '',
    email: '',
    message: '',
  };

  handleChange = (e) => {
    if (e.target.name === 'name') {
      this.setState({ name: e.target.value });
    }
    if (e.target.name === 'email') {
      this.setState({ email: e.target.value });
    }
    if (e.target.name === 'message') {
      this.setState({ message: e.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
		alert("E-mail enviado")
    }

  render() {
    const { name, email, message } = this.state;
    return (
      <Container>
        <Sidebar />
        <Content>
          <Form onSubmit={this.handleSubmit}>
            <h1>Contato</h1>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                required
                placeholder="Insira seu Nome:"
              />
            </label>
            <label>
              E-mail:
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
                placeholder="Insira seu  E-mail:"
              />
            </label>
            <label>
              Mensagem:
              <textarea
                name="message"
                value={message}
                onChange={this.handleChange}
                required
                placeholder="Insira sua Mensagem:"
              />
            </label>
            <SubmitButton>
              <span>Enviar</span>
            </SubmitButton>
          </Form>

          <Footer>
            <div>
              <span>© Todos os Direitos Reservados</span>
            </div>
            <div>
              <span>exemplo@ifb.edu.com</span>
              <span>(01) 2345-6789</span>
            </div>
          </Footer>
        </Content>
      </Container>
    );
  }
}
