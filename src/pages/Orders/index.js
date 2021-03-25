import React, { useState, useEffect, useCallback, useRef } from 'react';

import { MdAdd, MdArrowBack } from 'react-icons/md';
import { ReactTabulator, reactFormatter } from 'react-tabulator';
import { format } from 'date-fns';
import styled from 'styled-components';

import { PDFDownloadLink } from '@react-pdf/renderer';
import RemittanceDoc from '~/components/RemittancePdf/Remittancedoc';
import BillDoc from '~/components/RemittancePdf/Billdoc';

import { Container, Header, Back, Search, Filter, Table } from './styles';
import Button from '~/styles/components/Button';
import { Input } from '~/styles/components/Input';

import Modal from '~/components/Modal';

import {
  DownloadButton,
  DeleteButton,
  EditButton,
} from '~/components/ButtonTables';

import api from '~/services/api';

import history from '~/routes/history';


function LensesLayout(props) {
  const lensesData = props.cell._cell.value;
  const productData = props.cell._cell.row.data.product.is_base;

  lensesData.forEach(lens => {
    if (productData) {
      if (lens.side === 'right') {
        lensesData.right = `Derecha: ${lens.base}, A: ${lens.addition}`;
      } else if (lens.side === 'left') {
        lensesData.left = `Izquierda: ${lens.base}, A: ${lens.addition}`;
      }
    } else if (!productData) {
      if (lens.side === 'right') {
        lensesData.right = `Derecha: ${lens.SPH}, ${lens.CYL}`;
      } else if (lens.side === 'left') {
        lensesData.left = `Izquierda: ${lens.SPH}, ${lens.CYL},`;
      }
    }
  });
  return (
    <>
      <span>{lensesData.right}</span>
      <br />
      <span>{lensesData.left}</span>
    </>
  );
}

function ReferredModal({ info, updateInfo }) {
  const [HasDiscount, setHasDiscount] = useState(false);

  const [InfoClient, setInfoClient] = useState([]);

  const [DownloadInfo, setDownloadInfo] = useState('');

  const remittance = useRef();
  const bill = useRef();

  const ContainerModal = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
    justify-content: center;
  `;
  const ClientCards = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    border-radius: 15px;
    padding: 10px;
    background-color: #eee;
    margin: 20px;

    h2 {
      font-size: 24px;
      margin: 10px;
      align-self: center;
    }
    span {
      font-size: 20px;
      margin: 2px 10px;
    }

    input {
      height: 24px;
      width: 100px;
    }

    > button {
      border: 0;
      margin-top: 8px;
    }
  `;
  const ButtonSection = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 5px;

    button {
      span {
        font-size: 18px;
      }
    }
  `;
  const DownloadSection = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    align-content: center;
  `;

  const postCallApi = useCallback(
    async data => {
      const response = await api.post('remittance', data);
      // await api.post('remittance', data);
      updateInfo();
      return response;
    },
    [updateInfo]
  );

  const AddDiscount = useCallback(
    id => {
      const discount = prompt('Adicionar desconto', 0);
      if (
        discount === null ||
        discount === '' ||
        discount === 0 ||
        isNaN(discount)
      ) {
        const changeDiscount = InfoClient.map(info => {
          return info.id === id ? { ...info, discount: 0 } : info;
        });
        setInfoClient(changeDiscount);
      } else {
        setHasDiscount(true);
        const changeDiscount = InfoClient.map(info => {
          return info.id === id ? { ...info, discount } : info;
        });
        setInfoClient(changeDiscount);
      }
    },
    [InfoClient]
  );

  const PressSave = useCallback(
    async info => {
      const orders = info.orders.map(order => order.id);
      const data = {
        client_id: info.id,
        discount: info.discount,
        orders_ids: orders,
      };

      const response = await postCallApi(data);

      return response.data.id;
    },
    [postCallApi]
  );

  useEffect(() => {
    const clients = [];
    info.forEach(order => {
      let arrayTemporal = [];
      arrayTemporal = clients.filter(resp => resp.id === order.client.id);
      if (!arrayTemporal[0]) {
        const data = {
          ...order.client,
          orders: [order],
        };
        clients.push(data);
      } else {
        const { id } = arrayTemporal[0];
        clients.map(client => client.id === id && client.orders.push(order));
      }
    });
    // console.log(clients);

    clients.forEach(info => {
      info.totalPrice = 0;
      info.ordersIds = [];
      info.discount = 0;
      info.orders.forEach(order => (info.totalPrice += Number(order.price)));
      info.orders.forEach(order => info.ordersIds.push(order.id));
    });
    const dataApi = [];
    clients.forEach(info => {
      const data = {
        client_id: info.id,
        discount: info.discount,
        orders_ids: info.ordersIds,
      };
      dataApi.push(data);
    });
    setInfoClient(clients);
  }, [info, postCallApi]);

  return (
    <ContainerModal>
      {InfoClient.map(infoClient => (
        <ClientCards key={infoClient.id}>
          <h2>{infoClient.name}</h2>
          <span>Ordenes: {infoClient.orders.length}</span>
          <span>Precio: {infoClient.totalPrice}</span>
          {HasDiscount && <span>Descuento: {infoClient.discount}</span>}
          <button type="button" onClick={() => AddDiscount(infoClient.id)}>
            Descuento
          </button>
          <ButtonSection>
            <DownloadButton
              setDownloadInfo={setDownloadInfo}
              saveNewRemittance={() => PressSave(infoClient)}
            />
          </ButtonSection>
          <DownloadSection>
            {!!DownloadInfo && (
              <>
                <PDFDownloadLink
                  document={<RemittanceDoc info={DownloadInfo} />}
                  fileName={`Remito-${DownloadInfo.remittanceNumber}.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      'Loading document...'
                    ) : (
                      <span ref={remittance}>Baixar remessa</span>
                    )
                  }
                </PDFDownloadLink>
                <br />
                <PDFDownloadLink
                  document={<BillDoc info={DownloadInfo} />}
                  fileName={`Factura-${DownloadInfo.remittanceNumber}.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      'Loading document...'
                    ) : (
                      <span ref={bill}>Baixar fatura</span>
                    )
                  }
                </PDFDownloadLink>
                <br />
                <button
                  onClick={() => {
                    remittance.current.click();
                    bill.current.click();
                  }}
                  type="button"
                >
                  Baixar ambos
                </button>
              </>
            )}
          </DownloadSection>
        </ClientCards>
      ))}
    </ContainerModal>
  );
}

function BrokenLenses({ lenses, closeModal, updateInfo }) {
  const [LeftLens, setLeftLens] = useState([]);
  const [RightLens, setRightLens] = useState([]);
  const [BrokenLensesCounter, setBrokenLensesCounter] = useState(0);
  const setBrokenLens = useCallback(
    async id => {
      const confirmation = window.confirm('Estas seguro?');
      if (confirmation) {
        await api.put(`lenses/${id}`, { broken: true });
      }
      closeModal();
      updateInfo();
    },
    [closeModal, updateInfo]
  );

  useEffect(() => {
    const broken = lenses.filter(lens => lens.broken === true);
    const left = lenses.find(
      lens => lens.broken === false && lens.side === 'left'
    );
    const right = lenses.find(
      lens => lens.broken === false && lens.side === 'right'
    );
    setLeftLens(left);
    setRightLens(right);
    setBrokenLensesCounter(broken.length);
  }, [lenses]);
  const ContainerModal = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
    justify-content: center;
  `;
  const LensesCards = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    border-radius: 15px;
    padding: 10px;
    background-color: #eee;
    margin: 20px;
    h2 {
      font-size: 24px;
      margin: 10px;
      align-self: center;
    }
    span {
      font-size: 20px;
      margin: 2px 10px;
    }
    input {
      height: 24px;
      width: 100px;
    }
    > button {
      border: 0;
      margin-top: 8px;
    }
  `;
  const ButtonSection = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 5px;
    button {
      span {
        font-size: 18px;
      }
    }
  `;
  return (
    <ContainerModal>
      <LensesCards>
        <h2>Direito</h2>
        {RightLens.base ? (
          <>
            <span>Base: {RightLens.base}</span>
            <span>ADD: {RightLens.addition}</span>
          </>
        ) : (
          <>
            <span>SPH: {RightLens.SPH}</span>
            <span>CYL: {RightLens.CYL}</span>
          </>
        )}
        <ButtonSection>
          <button
            type="button"
            onClick={() => {
              setBrokenLens(RightLens.id);
            }}
          >
            <span>Refazer</span>
          </button>
        </ButtonSection>
      </LensesCards>
      <LensesCards>
        <h2>Esquerdo</h2>
        {LeftLens.base ? (
          <>
            <span>Base: {LeftLens.base}</span>
            <span>ADD: {LeftLens.addition}</span>
          </>
        ) : (
          <>
            <span>SPH: {LeftLens.SPH}</span>
            <span>CYL: {LeftLens.CYL}</span>
          </>
        )}
        <ButtonSection>
          <button
            type="button"
            onClick={() => {
              setBrokenLens(LeftLens.id);
            }}
          >
            <span>Refazer</span>
          </button>
        </ButtonSection>
      </LensesCards>
      <span>{BrokenLensesCounter}</span>
    </ContainerModal>
  );
}

function Orders() {
  const [Info, setInfo] = useState([]);
  const [InfoWithoutRemittance, setInfoWithoutRemittance] = useState([]);
  const [NotReferred, setNotReferred] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [SelectedInfo, setSelectedInfo] = useState([]);

  const [SelectedLenses, setSelectedLenses] = useState([]);

  const tableRef = useRef();

  const callOrdersApi = useCallback(async () => {
    const response = await api.get('order');
    const info = response.data;
    info.forEach(order => {
      const date = format(new Date(`${order.date}`), 'dd/MM/yyyy');
      order.formattedDate = date;
      order.extrasList = [];
      order.extras.forEach(extra => [order.extrasList.push(` ${extra.name}`)]);

      order.lenses.forEach(lens => {
        function convertTo3Digits(number) {
          if (!!number && Math.sign(number) === -1) {
            if ((-number).toString().length === 2) {
              return `-0${-number}`;
            }
          } else if (!!number && Math.sign(number) === 1) {
            if (number.toString().length === 2) {
              return `0${number}`;
            }
          }
          return number;
        }

        lens.base = convertTo3Digits(lens.base);
        lens.CYL = convertTo3Digits(lens.CYL);
        lens.SHP = convertTo3Digits(lens.SHP);
      });
    });
    // TODO: necesitamos formatear el precio
    const infoWithoutRemittance = info.filter(
      order => order.referred === false
    );
    setInfoWithoutRemittance(infoWithoutRemittance);
    setInfo(info);
  }, []);

  const columnsAll = [
    {
      title: 'Client',
      field: 'client.name',
      vertAlign: 'middle',
      minWidth: 90,
    },
    {
      title: 'Fecha',
      field: 'formattedDate',
      vertAlign: 'middle',
      width: 100,
      hozAlign: 'center',
      resizable: false,
    },
    {
      title: 'Turno',
      field: 'shift',
      vertAlign: 'middle',
      width: 90,
      hozAlign: 'center',
      resizable: false,
    },
    {
      title: 'Pedido nº',
      field: 'order_number',
      vertAlign: 'middle',
      minWidth: 120,
      // hozAlign: 'center',
    },
    {
      title: 'Producto',
      field: 'product.name',
      vertAlign: 'middle',
      minWidth: 120,
      formatter: 'textarea',
    },
    {
      title: 'Lentes',
      field: 'lenses',
      vertAlign: 'middle',
      formatter: reactFormatter(<LensesLayout />),
      minWidth: 200,
      headerSort: false,
      cellClick(e, cell) {
        setSelectedLenses(cell._cell.value);
        setOpenModal(true);
      },
    },
    {
      title: 'Armazon',
      field: 'frame',
      vertAlign: 'middle',
      width: 110,
      formatter: 'textarea',
    },
    {
      title: 'Extras',
      field: 'extrasList',
      formatter: 'textarea',
      vertAlign: 'middle',
      minWidth: 90,
      headerSort: false,
    },
    {
      title: 'Precio',
      field: 'price',
      vertAlign: 'middle',
      minWidth: 90,
      // hozAlign: 'center',
    },
    {
      title: 'Nota',
      field: 'note',
      formatter: 'textarea',
      vertAlign: 'middle',
      minWidth: 80,
    },
    {
      title: 'Estado',
      field: 'state.state',
      vertAlign: 'middle',
      minWidth: 100,
      resizable: false,
    },
    {
      title: 'Edit',
      field: 'edit',
      width: 70,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(<EditButton />),
      vertAlign: 'middle',
      resizable: false,
    },
    {
      title: 'Delete',
      field: 'delete',
      width: 80,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <DeleteButton route="order" functionReload={callOrdersApi} />
      ),
      vertAlign: 'middle',
      resizable: false,
    },
  ];

  const columnsNotReferred = [
    {
      title: 'Client',
      field: 'client.name',
      vertAlign: 'middle',
      minWidth: 90,
    },
    {
      title: 'Fecha',
      field: 'formattedDate',
      vertAlign: 'middle',
      width: 100,
      hozAlign: 'center',
      resizable: false,
    },
    {
      title: 'Turno',
      field: 'shift',
      vertAlign: 'middle',
      width: 90,
      hozAlign: 'center',
      resizable: false,
    },
    {
      title: 'Pedido nº',
      field: 'order_number',
      vertAlign: 'middle',
      minWidth: 120,
      // hozAlign: 'center',
    },
    {
      title: 'Producto',
      field: 'product.name',
      vertAlign: 'middle',
      minWidth: 120,
      formatter: 'textarea',
    },
    {
      title: 'Lentes',
      field: 'lenses',
      vertAlign: 'middle',
      formatter: reactFormatter(<LensesLayout />),
      minWidth: 200,
      headerSort: false,
    },
    {
      title: 'Armazon',
      field: 'frame',
      vertAlign: 'middle',
      width: 110,
      formatter: 'textarea',
    },
    {
      title: 'Extras',
      field: 'extrasList',
      formatter: 'textarea',
      vertAlign: 'middle',
      minWidth: 90,
      headerSort: false,
    },
    {
      title: 'Precio',
      field: 'price',
      vertAlign: 'middle',
      minWidth: 90,
      // hozAlign: 'center',
    },
    {
      title: 'Nota',
      field: 'note',
      formatter: 'textarea',
      vertAlign: 'middle',
      minWidth: 80,
    },
    {
      title: 'Estado',
      field: 'state.state',
      vertAlign: 'middle',
      minWidth: 100,
      resizable: false,
    },
    {
      formatter: 'rowSelection',
      titleFormatter: 'rowSelection',
      hozAlign: 'center',
      headerSort: false,
      cellClick(e, cell) {
        cell.getRow().toggleSelect();
      },
    },
  ];

  useEffect(() => {
    callOrdersApi();
  }, [callOrdersApi]);
  return (
    <Container>
      <Header>
        <Back>
          <MdArrowBack
            size={40}
            onClick={() => {
              history.goBack();
            }}
          />
        </Back>
        <h1>Consulta de pedidos</h1>
        {NotReferred ? (
          <Button
            onClick={() => {
              const selectedData = tableRef.current.table.getSelectedData();
              setSelectedInfo(selectedData);
              const selectedRow = tableRef.current.table.getSelectedRows();
              if (selectedRow[0]) {
                setOpenModal(true);
              }
              selectedRow.map(row => row.deselect());
            }}
          >
            <MdAdd size={30} />
            <span>Fazer remessa</span>
          </Button>
        ) : (
          <Button onClick={() => history.push('/orderregister')}>
            <MdAdd size={30} />
            <span>Fazer pedido</span>
          </Button>
        )}
      </Header>
      <Search>
        <Filter>
          <button type="button" onClick={() => setNotReferred(false)}>
            Todos
          </button>
          <button type="button" onClick={() => setNotReferred(true)}>
            Sem remessa
          </button>
        </Filter>
        <Input
          placeholder="Buscar por nome"
          onChange={() => alert('On Progress...')}
        />
      </Search>
      <Table>
        <div>
          {NotReferred ? (
            <ReactTabulator
              ref={tableRef}
              data={InfoWithoutRemittance}
              columns={columnsNotReferred}
              tooltips
              layout="fitData"
              responsiveLayout="hide"
              cellVertAlign="middle"
              height="78vh"
            />
          ) : (
            <ReactTabulator
              data={Info}
              columns={columnsAll}
              tooltips
              layout="fitData"
              responsiveLayout="hide"
              cellVertAlign="middle"
              height="78vh"
            />
          )}
        </div>
      </Table>
      {OpenModal && (
        <Modal
          name={NotReferred ? 'Descargas' : 'Lentes'}
          closeFunction={() => {
            setOpenModal(false);
          }}
        >
          {NotReferred ? (
            <ReferredModal info={SelectedInfo} updateInfo={callOrdersApi} />
          ) : (
            <BrokenLenses
              lenses={SelectedLenses}
              updateInfo={callOrdersApi}
              closeModal={() => {
                setOpenModal(false);
              }}
            />
          )}
        </Modal>
      )}
    </Container>
  );
}

export default Orders;
