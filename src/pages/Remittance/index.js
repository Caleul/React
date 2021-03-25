import React, { useState, useCallback, useEffect, useRef } from 'react';

import { format } from 'date-fns';
import { ReactTabulator, reactFormatter } from 'react-tabulator';
import { PDFDownloadLink } from '@react-pdf/renderer';
import styled from 'styled-components';
import {
  Container,
  Header,
  Content,
  Table,
} from '~/components/QuerryStyles/styles';
import Sidebar from '~/components/Sidebar';

import Modal from '~/components/Modal';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/materialize/tabulator_materialize.min.css';

import RemittanceDoc from '~/components/RemittancePdf/Remittancedoc';
import BillDoc from '~/components/RemittancePdf/Billdoc';

import api from '~/services/api';

import { DownloadButton } from '~/components/ButtonTables/index';

function InfoModal({ orders }) {
  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    justify-content: space-around;
  `;

  const Order = styled.div`
    background-color: #eee;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
  `;

  const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 18px;
    gap: 5px;
    align-items: center;
  `;

  const Lenses = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 16px;
  `;

  const Lens = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  `;
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

  // console.log(orders);
  return (
    <Container>
      {orders.map(order => (
        <Order>
          <Info>
            <span>
              <strong>Produto:</strong> {order.product.name}
            </span>
            <span>
              <strong>Nº do pedido:</strong> {order.order_number}
            </span>
          </Info>
          <Lenses>
            {order.lenses.map(lens => {
              lens.base = convertTo3Digits(lens.base);
              lens.CYL = convertTo3Digits(lens.CYL);
              lens.SHP = convertTo3Digits(lens.SHP);
              if (!lens.broken) {
                if (lens.side === 'right') {
                  return (
                    <Lens>
                      <span>
                        <strong>Direito</strong>
                      </span>
                      {order.product.id_base ? (
                        <>
                          <span>
                            <strong>Base:</strong> {lens.base}
                          </span>
                          <span>
                            <strong>Add:</strong> {lens.addition}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            <strong>SPH:</strong> {lens.SPH}
                          </span>
                          <span>
                            <strong>CYL:</strong> {lens.CYL}
                          </span>
                        </>
                      )}
                    </Lens>
                  );
                }
                if (lens.side === 'left') {
                  return (
                    <Lens>
                      <span>
                        <strong>Esquerdo</strong>
                      </span>
                      {order.product.id_base ? (
                        <>
                          <span>
                            <strong>Base:</strong> {lens.base}
                          </span>
                          <span>
                            <strong>Add:</strong> {lens.addition}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            <strong>SPH:</strong> {lens.SPH}
                          </span>
                          <span>
                            <strong>CYL:</strong> {lens.CYL}
                          </span>
                        </>
                      )}
                    </Lens>
                  );
                }
              }
            })}
          </Lenses>
        </Order>
      ))}
    </Container>
  );
}

export default function Remittance() {
  const [TableInfo, setTableInfo] = useState([]);
  const [OpenModal, setOpenModal] = useState(false);
  const [ModalInfo, setModalInfo] = useState(false);
  const [InfoForModal, setInfoForModal] = useState();

  const [DownloadInfo, setDownloadInfo] = useState({});

  const remittance = useRef();
  const bill = useRef();

  const getApiCall = useCallback(async () => {
    const response = await api.get('remittance');
    response.data.remittances.forEach(remittance => {
      const number = remittance.id + 1000;
      const date = format(new Date(`${remittance.created_at}`), 'dd/MM/yyyy');
      remittance.formattedDate = date;
      remittance.number = number;
    });
    setTableInfo(response.data.remittances);
  }, []);

  useEffect(() => {
    getApiCall();
  }, [getApiCall]);

  const Columns = [
    {
      title: 'Numero de remito',
      field: 'number',
      vertAlign: 'middle',
      cellClick(e, cell) {
        const ordersInRemittance = cell._cell.row.data.orders;
        setInfoForModal(ordersInRemittance);
        setModalInfo(true);
      },
    },
    {
      title: 'Cliente',
      field: 'client.name',
      vertAlign: 'middle',
    },
    {
      title: 'Fecha de creación',
      field: 'formattedDate',
      vertAlign: 'middle',
    },
    {
      title: 'Descuento',
      field: 'discount',
      vertAlign: 'middle',
      cellClick(e, cell) {
        const discount = prompt('Adicionar Descuento', cell._cell.value);
        async function callApiRemittance(id, discount) {
          await api.put(`remittance/${id}`, discount);
          getApiCall();
        }
        if (!(discount === cell._cell.value)) {
          const { id } = cell.getRow()._row.data;
          const data = { discount };
          callApiRemittance(id, data);
        }
      },
    },
    {
      title: 'Descarga',
      field: 'download',
      width: 120,
      hozAlign: 'center',
      headerSort: false,
      formatter: reactFormatter(
        <DownloadButton
          modalFunction={setOpenModal}
          setDownloadInfo={setDownloadInfo}
        />
      ),
      vertAlign: 'middle',
      resizable: false,
    },
  ];

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1>Remessa</h1>
        </Header>
        <Table>
          <div>
            <ReactTabulator
              data={TableInfo}
              columns={Columns}
              tooltips
              layout="fitData"
              responsiveLayout="hide"
            />
          </div>
        </Table>
      </Content>
      {OpenModal && (
        <Modal name="Descargar" closeFunction={() => setOpenModal(false)}>
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
        </Modal>
      )}
      {ModalInfo && (
        <Modal
          name="Pedidos da remessa"
          closeFunction={() => setModalInfo(false)}
        >
          <InfoModal orders={InfoForModal} />
        </Modal>
      )}
    </Container>
  );
}
