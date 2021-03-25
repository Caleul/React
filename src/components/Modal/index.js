import React from 'react';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';

import { Container, Content, Header } from './styles';

const Modal = ({ children, closeFunction, name }) => (
  <Container>
    <Content>
      <Header>
        <h2>{name}</h2>
        <button type="button" onClick={closeFunction}>
          <MdClose size={24} />
        </button>
      </Header>
      {children}
    </Content>
  </Container>
);

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  size: PropTypes.string,
};

Modal.defaultProps = {
  size: 'default',
};

export default Modal;
