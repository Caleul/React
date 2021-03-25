import React, { useCallback } from 'react';

import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { format } from 'date-fns';
import { ButtonEdit } from '~/components/QuerryStyles/styles';

import api from '~/services/api';

export function DeleteButton(props) {
  const rowData = props.cell._cell.row.data;
  const cellValue = <MdDeleteForever size={24} />;

  const DeleteOnApi = useCallback(async () => {
    const password = 2709;
    const confirmation = prompt(
      'Tem certeza?'
    );
		
    Number(confirmation) === password &&
      (await api.delete(`${props.route}/${rowData.id}`));
			
    props.functionReload();
  }, [props, rowData.id]);

  return <ButtonEdit onClick={DeleteOnApi}>{cellValue}</ButtonEdit>;
}

export function EditButton({ cell, editFunction, name }) {
  const rowData = cell._cell.row.data;
  const cellValue = <MdEdit size={24} />;

  const click = useCallback(() => {
    editFunction ? editFunction(rowData, name) : alert('Em andamento');
  }, [editFunction, name, rowData]);

  return <ButtonEdit onClick={click}>{cellValue}</ButtonEdit>;
}

export function DownloadButton({
  cell,
  setDownloadInfo,
  modalFunction,
  saveNewRemittance,
}) {
  async function callApi(id) {
    const response = await api.get(`remittance/${id}`);
    return response.data;
  }

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

  const click = useCallback(async () => {
    const useId = saveNewRemittance
      ? await saveNewRemittance()
      : cell._cell.row.data.id;

    const data = await callApi(useId);
    function formatInfo() {
      const ordersInfo = [];
      data.remittance.orders.forEach(order => {
        const orderInfo = {
          ORDEN: order.order_number,
          MATERIAL: order.product.name,
          CALIBRADO: order.typeFrame.name,
          PRICE: Number(order.price),
        };
        order.lenses.forEach(lens => {
          lens.base = convertTo3Digits(lens.base);
          lens.CYL = convertTo3Digits(lens.CYL);
          lens.SHP = convertTo3Digits(lens.SHP);

          if (order.product.is_base === true) {
            if (lens.side === 'right') {
              orderInfo.OD = `B: ${lens.base}, ADD: ${lens.addition}`;
            } else if (lens.side === 'left') {
              orderInfo.OI = `B: ${lens.base}, ADD: ${lens.addition}`;
            }
          } else if (order.product.is_base === false) {
            if (lens.side === 'right') {
              orderInfo.OD = `SPH: ${lens.SPH}, CYL: ${lens.CYL}`;
            } else if (lens.side === 'left') {
              orderInfo.OI = `SPH: ${lens.SPH}, CYL: ${lens.CYL}`;
            }
          }
        });
        ordersInfo.push(orderInfo);
      });
      const price = ordersInfo.reduce(
        (total, { PRICE }) => total + Number(PRICE),
        0
      );

      if (!(Number(data.remittance.discount) === 0)) {
        data.remittance.totalPrice = price - Number(data.remittance.discount);
      } else {
        data.remittance.totalPrice = price;
      }

      const info = {
        orders: ordersInfo,
        client: data.remittance.client,
        date: format(new Date(`${data.remittance.created_at}`), 'dd/MM/yyyy'),
        remittanceNumber: Number(data.remittance.id) + 1000,
        company: data.company,
        discount: data.remittance.discount,
        totalPrice: data.remittance.totalPrice,
      };
      setDownloadInfo(info);
    }
    formatInfo();
    !!modalFunction && modalFunction(true);
  });

  return (
    <button type="button" onClick={click}>
      Download
    </button>
  );
}
