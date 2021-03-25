import React, { useState, useEffect, useCallback } from 'react';

import { MdAdd, MdRemove } from 'react-icons/md';
import { ReactTabulator } from 'react-tabulator';
import Modal from '~/components/Modal';

import {
  Container,
  Header,
  Content,
  Table,
  TypeForm,
} from '~/components/QuerryStyles/styles';
import Button from '~/styles/components/Button';
import Sidebar from '~/components/Sidebar';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/materialize/tabulator_materialize.min.css';

import api from '~/services/api';

const columnsBase = [
  {
    title: 'Base',
    field: 'base',
    vertAlign: 'middle',
  },
  {
    title: 'Cantidad',
    field: 'quantity',
    vertAlign: 'middle',
  },
];

function InventoryModal({ productList, productSelected, updateFunction }) {
  const [productId, setProductId] = useState(productSelected);
  const [CYL, setCYL] = useState('');
  const [SPH, setSPH] = useState('');
  const [Base, setBase] = useState('');
  const [Quantity, setQuantity] = useState('');

  const [IsBase, setIsBase] = useState(false);

  useEffect(() => {
    if (productList[0]) {
      const { is_base } = productList.find(
        element => element.id === parseInt(productSelected)
      );
      setIsBase(is_base);
    }
  }, [productList, productSelected]);

  const postInventoryApi = useCallback(
    async (isBase, data) => {
      let route = '';
      if (isBase) {
        route = 'inventorybase';
      } else if (!isBase) {
        route = 'inventory';
      }
      await api.post(route, data);
      // console.log(data);
      updateFunction(productId);
    },
    [productId, updateFunction]
  );

  const handleSelectChange = useCallback(
    e => {
      setProductId(e.target.value);
      const { is_base } = productList.find(
        element => element.id === parseInt(e.target.value)
      );

      setIsBase(is_base);
    },
    [productList]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const data = {
        product_id: productId,
        base: Base,
        CYL,
        SPH,
        quantity: Number(Quantity),
      };
      postInventoryApi(IsBase, data);

      setCYL('');
      setSPH('');
      setBase('');
      setQuantity('');
    },
    [Base, CYL, IsBase, Quantity, SPH, postInventoryApi, productId]
  );

  return (
    <form onSubmit={handleSubmit}>
      <span>Product</span>
      {/* //TODO: select  */}
      <select name="product" value={productId} onChange={handleSelectChange}>
        {productList.map(product => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      {IsBase ? (
        <>
          <span>Base</span>
          <input
            placeholder="Base"
            value={Base}
            required
            type="number"
            step="25"
            onChange={e => {
              setBase(e.target.value);
            }}
          />
        </>
      ) : (
        <>
          <span>SPH</span>
          <input
            placeholder="SPH"
            value={SPH}
            required
            type="number"
            step="25"
            onChange={e => {
              setSPH(e.target.value);
            }}
          />
          <span>CYL</span>
          <input
            placeholder="CYL"
            value={CYL}
            required
            type="number"
            step="25"
            onChange={e => {
              setCYL(e.target.value);
            }}
          />
        </>
      )}
      <span>Quantidade</span>
      <input
        placeholder="Quantidade"
        value={Quantity}
        required
        type="number"
        onChange={e => {
          setQuantity(e.target.value);
        }}
      />
      <Button type="submit">
        <span>Adicionar ao inventario</span>
      </Button>
    </form>
  );
}

function Inventory() {
  const [Products, setProducts] = useState([]);
  const [ProductSelect, setProductSelect] = useState('');
  const [InventoryPositiveInfo, setInventoryPositiveInfo] = useState([]);
  const [InventoryNegativeInfo, setInventoryNegativeInfo] = useState([]);
  const [Columns, setColumns] = useState([]);
  const [IsBase, setIsBase] = useState(false);
  const [IsPositive, setIsPositive] = useState(true);

  const [ModalOpened, setModalOpened] = useState(false);

  const ProcessInformation = useCallback(
    async (is_base, inventory, inventoryBase) => {
      let maxCYL = 0;
      let info = [];
      if (is_base) {
        info = inventoryBase;
        setColumns(columnsBase);
      } else {
        await inventory.forEach(item => {
          if (item.CYL < maxCYL) {
            maxCYL = item.CYL;
          }
          const existSPH = info.find(element => element.SPH === item.SPH);
          if (existSPH) {
            const index = info.indexOf(existSPH);
            const key = `CYL${item.CYL}`;
            info[index][key] = item.quantity;
          } else {
            const obj = { SPH: item.SPH };
            const key = `CYL${item.CYL}`;
            obj[key] = item.quantity;
            info.push(obj);
          }
        });
        const columns = [];
        while (maxCYL <= 0) {
          if (`${maxCYL}`.length === 3) {
            columns.push({
              title: `-0${-maxCYL}`,
              field: `CYL${maxCYL}`,
              headerSort: false,
              minWidth: 70,
            });
          } else {
            columns.push({
              title: `${maxCYL}`,
              field: `CYL${maxCYL}`,
              headerSort: false,
              minWidth: 70,
            });
          }
          maxCYL += 25;
        }
        const columnsNoBase = [
          {
            title: 'SPH',
            field: 'SPH',
            width: 80,
            hozAlign: 'center',
            vertAlign: 'middle',
          },
          {
            title: 'CYL',
            hozAlign: 'center',
            vertAlign: 'middle',
            columns: columns.reverse(),
          },
        ];
        setColumns(columnsNoBase);
      }
      const positiveInfo = info.filter(e => e.SPH >= 0 || e.base);
      const negativeInfo = info.filter(e => e.SPH < 0);
      setInventoryPositiveInfo(positiveInfo);
      setInventoryNegativeInfo(negativeInfo);
    },
    []
  );

  const showProductInfoApi = useCallback(
    async id => {
      const response = await api.get(`product/${id}`);
      const info = response.data;

      ProcessInformation(info.is_base, info.inventory, info.inventoryBase);
    },
    [ProcessInformation]
  );
  const callProductsListApi = useCallback(async () => {
    const response = await api.get('product');
    const info = response.data;
    setProducts(info);
    if (info[0]) {
      setProductSelect(info[0].id);
      showProductInfoApi(info[0].id);
      setIsBase(info[0].is_base);
    }
  }, [showProductInfoApi]);

  useEffect(() => {
    callProductsListApi();

  }, [ProcessInformation, callProductsListApi, showProductInfoApi]);

  const handleSelectChange = useCallback(
    e => {
      setProductSelect(e.target.value);

      const { is_base } = Products.find(
        element => element.id === Number(e.target.value)
      );
      setIsBase(is_base);

      showProductInfoApi(e.target.value);
    },
    [Products, showProductInfoApi]
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <select
            name="product"
            value={ProductSelect}
            onChange={handleSelectChange}
          >
            {Products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <h1>Consulta de Inventario</h1>

          <Button onClick={() => setModalOpened(true)}>
            <MdAdd size={24} />
            <span>Novo</span>
          </Button>
        </Header>
        {!IsBase && (
          <TypeForm>
            <div>
              <button type="button" onClick={() => setIsPositive(true)}>
                <MdAdd />
              </button>
              <button type="button" onClick={() => setIsPositive(false)}>
                <MdRemove />
              </button>
            </div>
          </TypeForm>
        )}
        <Table>
          <div>
            <ReactTabulator
              data={IsPositive ? InventoryPositiveInfo : InventoryNegativeInfo}
              columns={Columns}
              tooltips
              layout="fitData"
              responsiveLayout="hide"
            />
          </div>
        </Table>
        {!!ModalOpened && (
          <Modal
            name="Adicionar ao inventario"
            closeFunction={() => {
              setModalOpened(false);
            }}
          >
            <InventoryModal
              productList={Products}
              productSelected={ProductSelect}
              updateFunction={showProductInfoApi}
            />
          </Modal>
        )}
      </Content>
    </Container>
  );
}

export default Inventory;
