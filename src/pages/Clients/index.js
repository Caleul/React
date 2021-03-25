import React, { useState, useEffect, useCallback } from 'react';

import { MdAdd } from 'react-icons/md';
import { ReactTabulator, reactFormatter } from 'react-tabulator';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import api from '~/services/api';

import Modal from '~/components/Modal';

import history from '~/routes/history';

import { DeleteButton, EditButton } from '~/components/ButtonTables';

import {
  Container,
  Header,
  Search,
  Content,
  Table,
} from '~/components/QuerryStyles/styles';
import Sidebar from '~/components/Sidebar';
import Button from '~/styles/components/Button';
import { Input } from '~/styles/components/Input';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/materialize/tabulator_materialize.min.css';

function ModalClientInfo({ info }) {
  const List = styled.dl`
    display: flex;
    flex-direction: column;
    /* align-items: center; */

    dt {
      font-size: 18px;
      font-weight: bold;
      margin-top: 5px;
    }
    dd {
      font-size: 16px;
      margin: 5px;
    }
  `;

  return (
    <List>
      <dt>CUIT:</dt>
      <dd>{info.CUIT}</dd>
      <dt>Contactos:</dt>
      {info.owners.map(owner => (
        <dd key={owner.id}>{owner.owners}</dd>
      ))}
      <dt>Teléfonos:</dt>
      {info.phones.map(phone => (
        <dd key={phone.id}>{phone.phone}</dd>
      ))}
      <dt>Emails:</dt>
      {info.emails.map(mail => (
        <dd key={mail.id}>{mail.mail}</dd>
      ))}
      <dt>Dirección:</dt>
      {info.addresses.map(address => (
        <div key={address.id}>
          <dd>País: {address.country}</dd>
          <dd>Estado: {address.state}</dd>
          <dd>Cidade: {address.address}</dd>
          <dd>CEP: {address.zip_code}</dd>
        </div>
      ))}
    </List>
  );
}

function Workers() {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [ModalOpened, setModalOpened] = useState(false);
  const [ClientInfoModal, setClientInfoModal] = useState({});

  const IsAdmin = useSelector(state => state.auth.admin);
  const llamadaApi = useCallback(async () => {
    const response = await api.get('client');
    response.data.data.forEach(item => {
      item.countOrders = item.orders.filter(
        order => order.referred === false
      ).length;
      item.avatar = `https://avatars.dicebear.com/api/initials/${item.name}.svg?r=15&w=50&h=50`;
      item.mail = item.emails[0].mail;
      item.tel = item.phones[0].phone;
    });
    setData(response.data.data);
    setFilteredData(response.data.data);
  }, []);

  const columns = [
    {
      title: 'Avatar',
      field: 'avatar',
      formatter: 'image',
      formatterParams: {
        height: '50px',
        width: '50px',
      },
      vertAlign: 'middle',
      width: 100,
    },
    {
      title: 'Name',
      field: 'name',
      vertAlign: 'middle',
    },
    {
      title: 'Mail',
      field: 'mail',
      vertAlign: 'middle',
    },
    {
      title: 'Tel',
      field: 'tel',
      vertAlign: 'middle',
    },
    {
      title: 'CUIT',
      field: 'CUIT',
      vertAlign: 'middle',
    },
    {
      title: 'Is Client',
      field: 'is_client',
      width: 150,
      hozAlign: 'center',
      formatter: 'tickCross',
      sorter: 'boolean',
      vertAlign: 'middle',
    },
    {
      title: 'Pedidos',
      field: 'countOrders',
      width: 150,
      hozAlign: 'center',
      vertAlign: 'middle',
    },
    {
      title: 'Edit',
      field: 'edit',
      width: 100,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(<EditButton />),
      vertAlign: 'middle',
    },
  ];

  const columnsAdmin = [
    {
      title: 'Avatar',
      field: 'avatar',
      formatter: 'image',
      formatterParams: {
        height: '50px',
        width: '50px',
      },
      vertAlign: 'middle',
      width: 100,
      cellClick(e, cell) {
        setClientInfoModal(cell._cell.row.data);
        setModalOpened(true);
      },
    },
    {
      title: 'Name',
      field: 'name',
      vertAlign: 'middle',
    },
    {
      title: 'Mail',
      field: 'mail',
      vertAlign: 'middle',
    },
    {
      title: 'Tel',
      field: 'tel',
      vertAlign: 'middle',
    },
    {
      title: 'Is Client',
      field: 'is_client',
      width: 150,
      hozAlign: 'center',
      formatter: 'tickCross',
      sorter: 'boolean',
      vertAlign: 'middle',
    },
    {
      title: 'Pedidos',
      field: 'countOrders',
      width: 150,
      hozAlign: 'center',
      vertAlign: 'middle',
    },
    {
      title: 'Edit',
      field: 'edit',
      width: 100,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(<EditButton />),
      vertAlign: 'middle',
    },
    {
      title: 'Delete',
      field: 'delete',
      width: 100,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <DeleteButton route="client" functionReload={llamadaApi} />
      ),
      vertAlign: 'middle',
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
          user.name.toLowerCase().includes(filterInput.toLowerCase())
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
          <h1>Consulta de Cliente</h1>
          <Button onClick={() => history.push('/clientregister')}>
            <MdAdd size={24} />
            <span>Novo</span>
          </Button>
        </Header>
        <Search>
          <h2>Consulta de Cliente</h2>
          <Input
            placeholder="Buscar por nome"
            value={filterInput}
            onChange={handleFilterInput}
          />
        </Search>
        <Table>
          <div>
            {IsAdmin ? (
              <ReactTabulator
                data={filteredData}
                columns={columnsAdmin}
                tooltips
                layout="fitData"
                responsiveLayout="hide"
                cellVertAlign="middle"
              />
            ) : (
              <ReactTabulator
                data={filteredData}
                columns={columns}
                tooltips
                layout="fitData"
                responsiveLayout="hide"
                cellVertAlign="middle"
              />
            )}
          </div>
        </Table>
      </Content>
      {!!ModalOpened && (
        <Modal
          name={ClientInfoModal.name}
          closeFunction={() => {
            setModalOpened(false);
          }}
        >
          <ModalClientInfo info={ClientInfoModal} />
        </Modal>
      )}
    </Container>
  );
}

export default Workers;
