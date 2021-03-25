import React from 'react';

import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import arrowLeft from '@iconify/icons-bi/arrow-left';
import jsSquare from '@iconify/icons-fa-brands/js-square';
import photoshopIcon from '@iconify/icons-whh/photoshop';
import css3Alt from '@iconify/icons-fa-brands/css3-alt';
import htmlFive from '@iconify/icons-icomoon-free/html-five';
import figmaIcon from '@iconify/icons-cib/figma';
import adobeXd from '@iconify/icons-cib/adobe-xd';
import logoNodejs from '@iconify/icons-ion/logo-nodejs';
import {
  Container,
  SideBar,
  Profile,
  Skills,
  Content,
  TopBar,
  Categories,
  Proyectos,
} from './styles';
import profile from '../../assets/perfil.jpg';

function Galery() {
  return (
    <Container>
      <SideBar>
        <Profile>
          <Link to="/">
            <div className="toHome">
              <Icon icon={arrowLeft} height={32} color="#fff" />
              <strong> Back to Home</strong>
            </div>
          </Link>
          <div className="imagem">
            <img src={profile} alt="Exemplo" />
          </div>
          <h1>Nome</h1>
          <span>X Projetos</span>
          <div>
            <h2></h2>
            <p>
              Jovens de 21 anos que já são desenvolvedores jr profissionais com mais de 30 anos de experiência.
            </p>
          </div>
        </Profile>

        <Skills>
          <h2>Habilidades:</h2>
          <span>
            Front-end Developer -
            <Icon icon={figmaIcon} height={16} />
          </span>
          <span>
            Back-end -
            <Icon icon={jsSquare} height={16} />
          </span>
          <span>
            Full stack -
            <Icon icon={logoNodejs} height={16} />
          </span>
          <span>
            UX/UI -
            <Icon icon={adobeXd} height={16} /> -
            <Icon icon={photoshopIcon} height={16} />
          </span>
          <span>
            HTML, CSS e JS -
            <Icon icon={htmlFive} height={16} /> -
            <Icon icon={css3Alt} height={16} /> -
            <Icon icon={jsSquare} height={16} />
          </span>
        </Skills>
      </SideBar>
      <Content>
        <TopBar>
          <input type="text" placeholder="Search" />
          <div>
            <Link to="/">
              <span>Home</span>
            </Link>
            <Link to="/galery">
              <span>Galeria</span>
            </Link>
            <Link to="/contato">
              <span>Contatos</span>
            </Link>
          </div>
        </TopBar>
        <Categories />
        <Proyectos />
      </Content>
    </Container>
  );
}

export default Galery;
