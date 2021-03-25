import React from 'react';

import {
  Container,
  // Header,
  // Search,
  Content,
  // Table,
  // ButtonEdit,
} from '~/components/QuerryStyles/styles';
import Sidebar from '~/components/Sidebar';

function DashboardAdmin() {
  return (
    <Container>
      <Sidebar />
      <Content>
        <h1>On Progress ...</h1>
      </Content>
    </Container>
  );
}

export default DashboardAdmin;
