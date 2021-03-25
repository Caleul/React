import React, { useState, useCallback, useEffect } from 'react';

import Select from 'react-select';
import { format } from 'date-fns';
import history from '~/routes/history';

import customStyles from '~/styles/components/SelectsConfig';

import { Container, Content, Title } from '~/components/RegisterStyles/styles';
import {
  Form,
  FormInputs,
  TextArea,
  Inputs,
  Buttons,
  LensInput,
} from './styles';
import Sidebar from '~/components/Sidebar';
import { Input } from '~/styles/components/Input';
import Button from '~/styles/components/Button';

import api from '~/services/api';

function WorkersRegister() {
  const [Day, setDay] = useState('');
  const [Shift, setShift] = useState('');
  const [Client, setClient] = useState('');
  const [Product, setProduct] = useState('');
  const [IsExt, setIsExt] = useState(false);
  const [OrderNumber, setOrderNumber] = useState('');
  const [Frame, setFrame] = useState('');
  const [TypeFrame, setTypeFrame] = useState('');

  const [RightBase, setRightBase] = useState('');
  const [RightAddition, setRightAddition] = useState('');
  const [RightCYL, setRightCYL] = useState('');
  const [RightSPH, setRightSPH] = useState('');

  const [LeftBase, setLeftBase] = useState('');
  const [LeftAddition, setLeftAddition] = useState('');
  const [LeftCYL, setLeftCYL] = useState('');
  const [LeftSPH, setLeftSPH] = useState('');

  const [Extras, setExtras] = useState([]);
  const [Price, setPrice] = useState('');
  const [State, setState] = useState('');
  const [Notes, setNotes] = useState('');

  const [ClientList, setClientList] = useState([]);
  const [ProductList, setProductList] = useState([]);
  const [ExtrasList, setExtrasList] = useState([]);
  const [StatesList, setStatesList] = useState([]);
  const [TypeFrameList, setTypeFrameList] = useState([]);

  const [IsBase, setIsBase] = useState(false);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const data = {
        date: Day,
        shift: Shift,
        client_id: Client.id,
        order_number: OrderNumber,
        product_id: Product.id,
        type_frame_id: TypeFrame.id,
        frame: Frame,
        price: Price,
        note: Notes,
        order_state_id: State.id,
        extras: Extras,
      };
      let lenses = [];
      if (IsBase) {
        const baseLenses = [];
        if (RightBase) {
          const rightSide = {
            product_id: Product.id,
            side: 'right',
            base: RightBase,
            addition: RightAddition || 0,
          };
          baseLenses.push(rightSide);
        }
        if (LeftBase) {
          const leftSide = {
            product_id: Product.id,
            side: 'left',
            base: LeftBase,
            addition: LeftAddition || 0,
          };
          baseLenses.push(leftSide);
        }
        lenses = baseLenses;
      } else if (!IsBase) {
        const notBaseLenses = [];
        if (RightCYL || RightSPH) {
          const rightSide = {
            product_id: Product.id,
            side: 'right',
            CYL: RightCYL || 0,
            SPH: RightSPH || 0,
          };
          notBaseLenses.push(rightSide);
        }
        if (LeftCYL || LeftSPH) {
          const leftSide = {
            product_id: Product.id,
            side: 'left',
            CYL: LeftCYL || 0,
            SPH: LeftSPH || 0,
          };
          notBaseLenses.push(leftSide);
        }
        lenses = notBaseLenses;
      }
      async function apiPost() {
        await api.post('order', { ...data, lenses });
      }
      apiPost();

      setOrderNumber('');
      setFrame('');

      setRightBase('');
      setRightAddition('');
      setRightCYL('');
      setRightSPH('');

      setLeftBase('');
      setLeftAddition('');
      setLeftCYL('');
      setLeftSPH('');

      setPrice('');
      setNotes('');
    },
    [
      Client.id,
      Day,
      Extras,
      Frame,
      IsBase,
      LeftAddition,
      LeftBase,
      LeftCYL,
      LeftSPH,
      Notes,
      OrderNumber,
      Price,
      Product.id,
      RightAddition,
      RightBase,
      RightCYL,
      RightSPH,
      Shift,
      State.id,
      TypeFrame.id,
    ]
  );

  const handleChangeProduct = useCallback(async value => {
    setProduct(value);
    setIsBase(value.is_base);
  }, []);

  const handleChangeExtras = useCallback(async value => {
    const ids = value ? value.map(extra => extra.id) : [];
    setExtras(ids);
  }, []);

  const callSelectInfo = useCallback(async () => {
    const clientInfo = await await api.get('client?info=simple');
    const productsInfo = await api.get('product');
    const extrasInfo = await api.get('extra');
    const statesInfo = await api.get('state?info=simple');
    const typeFrameInfo = await api.get('typeFrame');

    setClientList(clientInfo.data);
    setProductList(productsInfo.data);
    setExtrasList(extrasInfo.data);
    setStatesList(statesInfo.data);
    setTypeFrameList(typeFrameInfo.data);
  }, []);

  useEffect(() => {
    callSelectInfo();

    const today = format(new Date(), 'yyyy-MM-dd');
    setDay(today);
  }, [callSelectInfo]);

  useEffect(() => {
    let extrasPrice = 0;
    Extras.forEach(extraId => {
      const { price } = ExtrasList.find(extra => extra.id === extraId);
      extrasPrice += Number(price);
    });
    const typeFramePrice = isNaN(Number(TypeFrame.price))
      ? 0
      : Number(TypeFrame.price);
    let productPrice = 0;
    if (IsExt) {
      productPrice = Number(Product.price_ext);
    } else if (Product) {
      productPrice = Number(Product.price);
    }
    const sum = extrasPrice + typeFramePrice + productPrice;
    setPrice(sum);
  }, [Extras, ExtrasList, IsExt, Product, TypeFrame, OrderNumber]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>
          <h1>Registro</h1>
        </Title>
        <Form onSubmit={handleSubmit}>
          <Inputs>
            <FormInputs>
              <span>Fecha</span>
              <Input
                placeholder="Fecha"
                type="date"
                value={Day}
                onChange={e => setDay(e.target.value)}
                required
              />
            </FormInputs>
            <FormInputs>
              <span>Turno</span>
              <Select
                styles={customStyles}
                onChange={value => setShift(value.value)}
                required
                placeholder="Selecione o turno"
                options={[
                  { value: 'manhã', label: 'Mañana' },
                  { value: 'tarde', label: 'Tarde' },
                ]}
              />
            </FormInputs>
            <FormInputs>
              <span>Cliente</span>
              <Select
                styles={customStyles}
                onChange={value => setClient(value)}
                required
                options={ClientList}
                getOptionLabel={client => client.name}
                getOptionValue={client => client.id}
              />
            </FormInputs>
            <FormInputs>
              <span>Produto</span>
              <Select
                styles={customStyles}
                onChange={handleChangeProduct}
                required
                options={ProductList}
                getOptionLabel={product => product.name}
                getOptionValue={product => product.id}
              />
              {Product && Product.price_ext && (
                <div>
                  <span>Extender?</span>
                  <input
                    type="checkbox"
                    name="extended"
                    defaultChecked={IsExt}
                    onChange={() => setIsExt(!IsExt)}
                  />
                </div>
              )}
            </FormInputs>
            <FormInputs>
              <span>Numero do Pedido</span>
              <Input
                placeholder="Nº Pedido"
                type="number"
                value={OrderNumber}
                onChange={e => setOrderNumber(e.target.value)}
                required
              />
            </FormInputs>
            <FormInputs>
              <span>Armazen</span>
              <Input
                placeholder="Armazen"
                type="text"
                value={Frame}
                onChange={e => setFrame(e.target.value)}
                required
              />
            </FormInputs>
            <FormInputs>
              <span>Calibrador</span>
              <Select
                styles={customStyles}
                onChange={value => setTypeFrame(value)}
                required
                options={TypeFrameList}
                getOptionLabel={typeFrame => typeFrame.name}
                getOptionValue={typeFrame => typeFrame.id}
              />
            </FormInputs>
            <FormInputs>
              <span>Direito</span>
              <LensInput>
                {IsBase ? (
                  <>
                    <Input
                      placeholder="Base"
                      type="number"
                      value={RightBase}
                      style={{ flex: 1 }}
                      step="25"
                      onChange={e => setRightBase(e.target.value)}
                    />
                    <Input
                      placeholder="Addition"
                      type="number"
                      value={RightAddition}
                      style={{ flex: 1 }}
                      onChange={e => setRightAddition(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      placeholder="SPH"
                      type="number"
                      value={RightSPH}
                      step="25"
                      onChange={e => setRightSPH(e.target.value)}
                    />
                    <Input
                      placeholder="CYL"
                      type="number"
                      value={RightCYL}
                      step="25"
                      onChange={e => setRightCYL(e.target.value)}
                    />
                  </>
                )}
              </LensInput>
            </FormInputs>
            <FormInputs>
              <span>Esquerdo</span>
              <LensInput>
                {IsBase ? (
                  <>
                    <Input
                      placeholder="Base"
                      type="number"
                      value={LeftBase}
                      style={{ flex: 1 }}
                      step="25"
                      onChange={e => setLeftBase(e.target.value)}
                    />
                    <Input
                      placeholder="Addition"
                      type="number"
                      value={LeftAddition}
                      style={{ flex: 1 }}
                      onChange={e => setLeftAddition(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      placeholder="SPH"
                      type="number"
                      value={LeftSPH}
                      step="25"
                      onChange={e => setLeftSPH(e.target.value)}
                    />
                    <Input
                      placeholder="CYL"
                      type="number"
                      value={LeftCYL}
                      step="25"
                      onChange={e => setLeftCYL(e.target.value)}
                    />
                  </>
                )}
              </LensInput>
            </FormInputs>
            <FormInputs>
              <span>Extras</span>
              <Select
                isMulti
                styles={customStyles}
                onChange={handleChangeExtras}
                required
                options={ExtrasList}
                getOptionLabel={extra => extra.name}
                getOptionValue={extra => extra.id}
              />
            </FormInputs>
            <FormInputs>
              <span>Preço</span>
              <Input
                placeholder="Precio"
                type="number"
                value={Price}
                onChange={e => setPrice(e.target.value)}
                required
              />
            </FormInputs>
            <FormInputs>
              <span>Estado</span>
              <Select
                styles={customStyles}
                onChange={value => setState(value)}
                required
                options={StatesList}
                getOptionLabel={state => state.state}
                getOptionValue={state => state.id}
              />
            </FormInputs>
            <FormInputs>
              <span>Notas</span>
              <TextArea
                placeholder="Notas"
                type="textarea"
                value={Notes}
                onChange={e => setNotes(e.target.value)}
              />
            </FormInputs>
          </Inputs>
          <Buttons>
            <Button
              color="black"
              type="button"
              onClick={() => history.goBack()}
            >
              <span>Voltar</span>
            </Button>
            <Button type="submit">
              <span>Adicionar Orden</span>
            </Button>
          </Buttons>
        </Form>
      </Content>
    </Container>
  );
}

export default WorkersRegister;
