import React, { useState, useEffect, useCallback } from 'react';

import { MdAdd } from 'react-icons/md';
import { ReactTabulator, reactFormatter } from 'react-tabulator';

import api from '~/services/api';

import history from '~/routes/history';

import {
  Container,
  Header,
  Search,
  Content,
  Table,
} from '~/components/QuerryStyles/styles';
import Button from '~/styles/components/Button';
import { Input } from '~/styles/components/Input';
import Sidebar from '~/components/Sidebar';

import { DeleteButton, EditButton } from '~/components/ButtonTables';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/materialize/tabulator_materialize.min.css';

function Workers() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const llamadaApi = useCallback(async () => {
    const response = await api.get('users');
    setData(response.data);
    setFilteredData(response.data);
  }, []);

  const columns = [
    { title: 'Username', field: 'username', width: 200 },
    { title: 'Name', field: 'name', width: 200 },
    { title: 'E-mail', field: 'email' },
    {
      title: 'Is Admin',
      field: 'admin',
      width: 150,
      hozAlign: 'center',
      formatter: 'tickCross',
      sorter: 'boolean',
    },
    {
      title: 'Edit',
      field: 'edit',
      width: 100,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(<EditButton />),
    },
    {
      title: 'Delete',
      field: 'delete',
      width: 100,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <DeleteButton route="users" functionReload={llamadaApi} />
      ),
    },
  ];

  useEffect(() => {
    llamadaApi();
  }, [llamadaApi]);

  const handleFilterInput = useCallback(
    e => {
      setFilterInput(e.target.value);
      if (e.target.value === '') {
        setFilteredData(data);
        return;
      }
      setFilteredData(
        data.filter(user =>
          user.username.toLowerCase().includes(filterInput.toLowerCase())
        )
      );
    },
    [data, filterInput]
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1>Consulta de Funcionarios</h1>
          <Button onClick={() => history.push('/workersregister')}>
            <MdAdd size={24} />
            <span>Novo</span>
          </Button>
        </Header>
        <Search>
          <h2>Consulta de funcionarios</h2>
          <Input
            placeholder="Buscar por nome"
            value={filterInput}
            onChange={handleFilterInput}
          />
        </Search>
        <Table>
          <div>
            <ReactTabulator
              data={filteredData}
              columns={columns}
              tooltips
              layout="fitData"
              responsiveLayout="hide"
            />
          </div>
        </Table>
      </Content>
    </Container>
  );
}

export default Workers;
