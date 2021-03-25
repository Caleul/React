import React, { useCallback, useState, useEffect } from 'react';

import { ReactTabulator, reactFormatter } from 'react-tabulator';
import { MdAdd } from 'react-icons/md';

import { Container, Header } from '~/components/QuerryStyles/styles';
import { ConfigTable, Content, Table, Button, Tables } from './styles';
import Sidebar from '~/components/Sidebar';

import Modal from '~/components/Modal';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/materialize/tabulator_materialize.min.css';

import ButtonSubmit from '~/styles/components/Button';

import { DeleteButton, EditButton } from '~/components/ButtonTables';

import api from '~/services/api';

function ProductModal({ apiCall, infoPut, closeFunction }) {
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [PriceExt, setPriceExt] = useState('');
  const [Is_Base, setIs_Base] = useState(false);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = {
        name: Name,
        price: Price,
        price_ext: PriceExt,
        is_base: Is_Base,
      };
      if (!infoPut) {
        apiCall(data, 'product');
      } else if (infoPut) {
        apiCall(data, `product/${infoPut.id}`);
        closeFunction();
      }

      setName('');
      setPrice('');
      setPriceExt('');
      setIs_Base(false);
    },
    [Is_Base, Name, Price, PriceExt, apiCall, closeFunction, infoPut]
  );

  useEffect(() => {
    if (infoPut) {
      setName(infoPut.name);
      setPrice(infoPut.price);
      setPriceExt(infoPut.price_ext);
      setIs_Base(infoPut.is_base);
    }
  }, [infoPut]);

  return (
    <form onSubmit={handleSubmit}>
      <span>Nome</span>
      <input
        placeholder="Nombre"
        value={Name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <span>Preço</span>
      <input
        placeholder="Preço"
        value={Price}
        type="number"
        onChange={e => {
          setPrice(e.target.value);
        }}
      />
      <span>Preço estendido</span>
      <input
        placeholder="Preço estendido"
        value={PriceExt}
        onChange={e => {
          setPriceExt(e.target.value);
        }}
      />
      <span>É base?</span>
      <input
        type="checkbox"
        value={Is_Base}
        checked={Is_Base}
        onChange={() => {
          setIs_Base(!Is_Base);
        }}
      />
      <ButtonSubmit type="submit">
        {infoPut ? (
          <span>Atualizar produto</span>
        ) : (
          <span>Adicionar produto</span>
        )}
      </ButtonSubmit>
    </form>
  );
}
function ExtraModal({ apiCall, infoPut, closeFunction }) {
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = {
        name: Name,
        price: Price,
      };
      if (!infoPut) {
        apiCall(data, 'extra');
      } else if (infoPut) {
        apiCall(data, `extra/${infoPut.id}`);
        closeFunction();
      }

      setName('');
      setPrice('');
    },
    [Name, Price, apiCall, closeFunction, infoPut]
  );

  useEffect(() => {
    if (infoPut) {
      setName(infoPut.name);
      setPrice(infoPut.price);
    }
  }, [infoPut]);

  return (
    <form onSubmit={handleSubmit}>
      <span>Nome</span>
      <input
        placeholder="Nombre"
        value={Name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <span>Preço</span>
      <input
        placeholder="Precio"
        value={Price}
        type="number"
        onChange={e => {
          setPrice(e.target.value);
        }}
      />
      <ButtonSubmit type="submit">
        <span>Adicionar Extra</span>
      </ButtonSubmit>
    </form>
  );
}
function StateModal({ apiCall, infoPut, closeFunction }) {
  const [Name, setName] = useState('');

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = {
        state: Name,
      };

      if (!infoPut) {
        apiCall(data, 'state');
      } else if (infoPut) {
        apiCall(data, `state/${infoPut.id}`);
        closeFunction();
      }

      setName('');
    },
    [Name, apiCall, closeFunction, infoPut]
  );

  useEffect(() => {
    if (infoPut) {
      setName(infoPut.state);
    }
  }, [infoPut]);

  return (
    <form onSubmit={handleSubmit}>
      <span>Nome</span>
      <input
        placeholder="Nome"
        value={Name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <ButtonSubmit type="submit">
        <span>Adicionar Estado</span>
      </ButtonSubmit>
    </form>
  );
}
function TypeFrameModal({ apiCall, infoPut, closeFunction }) {
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = {
        name: Name,
        price: Price,
      };
      if (!infoPut) {
        apiCall(data, 'typeFrame');
      } else if (infoPut) {
        apiCall(data, `typeFrame/${infoPut.id}`);
        closeFunction();
      }
      setName('');
      setPrice('');
    },
    [Name, Price, apiCall, closeFunction, infoPut]
  );

  useEffect(() => {
    if (infoPut) {
      setName(infoPut.name);
      setPrice(infoPut.price);
    }
  }, [infoPut]);

  return (
    <form onSubmit={handleSubmit}>
      <span>Nome</span>
      <input
        placeholder="Nome"
        value={Name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <span>Preço</span>
      <input
        placeholder="Preço"
        value={Price}
        type="number"
        onChange={e => {
          setPrice(e.target.value);
        }}
      />
      <ButtonSubmit type="submit">
        <span>Adicionar ajustado</span>
      </ButtonSubmit>
    </form>
  );
}
function CompanyModal() {
  const [Name, setName] = useState('');
  const [Country, setCountry] = useState('');
  const [State, setState] = useState('');
  const [Address, setAddress] = useState('');
  return (
    <form>
      <span>Nome</span>
      <input
        placeholder="Nome"
        value={Name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <span>País</span>
      <input
        placeholder="País"
        value={Country}
        onChange={e => {
          setCountry(e.target.value);
        }}
      />
      <span>Estado</span>
      <input
        placeholder="Estado"
        value={State}
        onChange={e => {
          setState(e.target.value);
        }}
      />
      <span>Cidade</span>
      <input
        placeholder="Cidade"
        value={Address}
        onChange={e => {
          setAddress(e.target.value);
        }}
      />
    </form>
  );
}

function UserConfig() {
  const [HowOpenedModal, setHowOpenedModal] = useState('');

  const [ProductInfo, setProductInfo] = useState([]);
  const [ExtrasInfo, setExtrasInfo] = useState([]);
  const [TypeFrameInfo, setTypeFrameInfo] = useState([]);
  const [StateInfo, setStateInfo] = useState([]);
  const [CompanyInfo, setCompanyInfo] = useState([]);

  const [UpdateModalName, setUpdateModalName] = useState('');
  const [InfoUpdateModal, setInfoUpdateModal] = useState('');

  const collectInfoApi = useCallback(async () => {
    const productInfo = await api.get('product');
    const extraInfo = await api.get('extra');
    const typeFrameInfo = await api.get('typeFrame');
    const stateInfo = await api.get('state?info=simple');
    const companyInfo = await api.get('companies');

    setProductInfo(productInfo.data);
    setExtrasInfo(extraInfo.data);
    setTypeFrameInfo(typeFrameInfo.data);
    setStateInfo(stateInfo.data);
    setCompanyInfo(companyInfo.data);
  }, []);

  const openUpdateModal = useCallback((info, name) => {
    setUpdateModalName(name);
    setInfoUpdateModal(info);
  }, []);

  const postApi = useCallback(
    async (data, route) => {
      await api.post(route, data);
      collectInfoApi();
    },
    [collectInfoApi]
  );
  const putApi = useCallback(
    async (data, route) => {
      await api.put(route, data);
      collectInfoApi();
    },
    [collectInfoApi]
  );

  const ProductColumns = [
    { title: 'Nombre', field: 'name' },
    { title: 'Precio', field: 'price', width: 150 },
    { title: 'Precio Ext', field: 'price_ext', width: 150 },
    { title: 'Es Base', field: 'is_base', width: 150 },
    {
      title: 'Edit',
      field: 'edit',
      width: 70,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <EditButton name="Product" editFunction={openUpdateModal} />
      ),
    },
    {
      title: 'Delete',
      field: 'delete',
      width: 80,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <DeleteButton route="product" functionReload={collectInfoApi} />
      ),
    },
  ];
  const ExtrasColumns = [
    { title: 'Nombre', field: 'name' },
    { title: 'Precio', field: 'price' },
    {
      title: 'Edit',
      field: 'edit',
      width: 70,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(<EditButton />),
    },
    {
      title: 'Delete',
      field: 'delete',
      width: 80,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <DeleteButton route="extra" functionReload={collectInfoApi} />
      ),
    },
  ];
  const TypeFrameColumns = [
    { title: 'Nombre', field: 'name' },
    { title: 'Precio', field: 'price' },
    {
      title: 'Edit',
      field: 'edit',
      width: 70,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(<EditButton />),
    },
    {
      title: 'Delete',
      field: 'delete',
      width: 80,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <DeleteButton route="typeFrame" functionReload={collectInfoApi} />
      ),
    },
  ];
  const StateColumns = [
    { title: 'Nombre', field: 'state' },
    {
      title: 'Edit',
      field: 'edit',
      width: 70,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(<EditButton />),
    },
    {
      title: 'Delete',
      field: 'delete',
      width: 80,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <DeleteButton route="state" functionReload={collectInfoApi} />
      ),
    },
  ];
  const CompanyColumns = [
    { title: 'Nombre', field: 'name' },
    { title: 'Pais', field: 'country' },
    { title: 'Provincia', field: 'state' },
    { title: 'Calle', field: 'address' },
    {
      title: 'Edit',
      field: 'edit',
      width: 70,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(<EditButton />),
    },
  ];

  useEffect(() => {
    collectInfoApi();
  }, [collectInfoApi]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1>Configuraciones</h1>
        </Header>
        <Tables>
          <ConfigTable>
            <div>
              <h2>Productos</h2>
              <Button
                onClick={() => {
                  setHowOpenedModal('Product');
                }}
              >
                <MdAdd size={30} />
              </Button>
            </div>

            <Table>
              <ReactTabulator
                data={ProductInfo}
                columns={ProductColumns}
                tooltips
                height="150px"
                layout="fitData"
                responsiveLayout="hide"
              />
            </Table>
          </ConfigTable>
          <ConfigTable>
            <div>
              <h2>Extras</h2>
              <Button
                onClick={() => {
                  setHowOpenedModal('Extra');
                }}
              >
                <MdAdd size={30} />
              </Button>
            </div>
            <Table>
              <ReactTabulator
                data={ExtrasInfo}
                columns={ExtrasColumns}
                tooltips
                height="150px"
                layout="fitData"
                responsiveLayout="hide"
              />
            </Table>
          </ConfigTable>
          <ConfigTable>
            <div>
              <h2>Calibrado</h2>
              <Button
                onClick={() => {
                  setHowOpenedModal('TypeFrame');
                }}
              >
                <MdAdd size={30} />
              </Button>
            </div>
            <Table>
              <ReactTabulator
                data={TypeFrameInfo}
                columns={TypeFrameColumns}
                tooltips
                height="150px"
                layout="fitData"
                responsiveLayout="hide"
              />
            </Table>
          </ConfigTable>
          <ConfigTable>
            <div>
              <h2>Estados</h2>
              <Button
                onClick={() => {
                  setHowOpenedModal('State');
                }}
              >
                <MdAdd size={30} />
              </Button>
            </div>
            <Table>
              <ReactTabulator
                data={StateInfo}
                columns={StateColumns}
                tooltips
                height="150px"
                layout="fitData"
                responsiveLayout="hide"
              />
            </Table>
          </ConfigTable>
          <ConfigTable>
            <h2>Empresa</h2>
            <Table>
              <ReactTabulator
                data={CompanyInfo}
                columns={CompanyColumns}
                tooltips
                layout="fitData"
                responsiveLayout="hide"
              />
            </Table>
          </ConfigTable>
        </Tables>

        {!!HowOpenedModal && (
          <Modal
            name={HowOpenedModal}
            closeFunction={() => setHowOpenedModal('')}
          >
            {
              {
                Product: <ProductModal apiCall={postApi} />,
                Extra: <ExtraModal apiCall={postApi} />,
                TypeFrame: <TypeFrameModal apiCall={postApi} />,
                State: <StateModal apiCall={postApi} />,
                Company: <CompanyModal apiCall={postApi} />,
              }[HowOpenedModal]
            }
          </Modal>
        )}
        {!!UpdateModalName && (
          <Modal
            name={UpdateModalName}
            closeFunction={() => setUpdateModalName('')}
          >
            {
              {
                Product: (
                  <ProductModal
                    apiCall={putApi}
                    infoPut={InfoUpdateModal}
                    closeFunction={() => setUpdateModalName('')}
                  />
                ),
                Extra: (
                  <ExtraModal
                    apiCall={putApi}
                    infoPut={InfoUpdateModal}
                    closeFunction={() => setUpdateModalName('')}
                  />
                ),
                TypeFrame: (
                  <TypeFrameModal
                    apiCall={putApi}
                    infoPut={InfoUpdateModal}
                    closeFunction={() => setUpdateModalName('')}
                  />
                ),
                State: (
                  <StateModal
                    apiCall={putApi}
                    infoPut={InfoUpdateModal}
                    closeFunction={() => setUpdateModalName('')}
                  />
                ),
                Company: (
                  <CompanyModal
                    apiCall={putApi}
                    infoPut={InfoUpdateModal}
                    closeFunction={() => setUpdateModalName('')}
                  />
                ),
              }[UpdateModalName]
            }
          </Modal>
        )}
      </Content>
    </Container>
  );
}

export default UserConfig;
