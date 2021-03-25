import React from 'react';

import { Icon } from '@iconify/react';
import arrowRight from '@iconify/icons-bi/arrow-right';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

import homebg from '../../assets/objecthomebg.png';

import { Container, Content } from './styles';

function home() {
  return (
    <Container>
      <Sidebar />
      <Content>
        <h1>
          Hello world <br/><br/> Esse site é apenas um teste, não demonstra a forma total das habilidades de nossos desenvolvedores
        </h1>
        <img src={homebg} alt="homebg" />
        <Link to="/galery">
          <button>
            <span>Conheça mais</span>
            <Icon icon={arrowRight} height={26} />
          </button>
        </Link>
      </Content>
    </Container>
  );
}

export default home;
