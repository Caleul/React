import React from 'react';
import { TiHomeOutline } from 'react-icons/ti';
import { MdPermContactCalendar } from 'react-icons/md';
import { Icon } from '@iconify/react';
import instagramWithCircle from '@iconify/icons-entypo-social/instagram-with-circle';
import linkedinWithCircle from '@iconify/icons-entypo-social/linkedin-with-circle';
import behanceCircleFilled from '@iconify/icons-ant-design/behance-circle-filled';
import githubFilled from '@iconify/icons-ant-design/github-filled';
import baselinePhotoLibrary from '@iconify/icons-ic/baseline-photo-library';

import { Link } from 'react-router-dom';

import Profile from '../../assets/perfil.jpg';

import { Container } from './styles';

function Sidebar() {
  return (
    <Container>
      <div>
        <img src={Profile} alt="kacio felipe" />
        <Link to="/galery">
          <h3>Vossa senhoria</h3>
        </Link>
      </div>
      <div className="icons">
        <Link to="/">
          <TiHomeOutline size={32} color="#fff" />
        </Link>
        <Link to="/galery">
          <Icon icon={baselinePhotoLibrary} height={32} color="#fff" />
        </Link>
        <Link to="/contato">
          <MdPermContactCalendar size={32} color="#fff" />
        </Link>
      </div>
      <div className="social">
        <a href="">
          <Icon icon={instagramWithCircle} height={48} color="#fff" />
        </a>
        <a href="">
          <Icon icon={linkedinWithCircle} height={48} color="#fff" />
        </a>
        <a href="">
          <Icon icon={behanceCircleFilled} height={48} color="#fff" />
        </a>
        <a href="">
          <Icon icon={githubFilled} height={48} color="#fff" />
        </a>
      </div>
    </Container>
  );
}

export default Sidebar;
