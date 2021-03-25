import React, { useState, useCallback } from 'react';
import history from '~/routes/history';

import api from '~/services/api';

import {
  Container,
  Content,
  Title,
  Form,
  Buttons,
  Select,
} from '~/components/RegisterStyles/styles';
import { FormSection } from './styles';
import Sidebar from '~/components/Sidebar';
import { Input } from '~/styles/components/Input';
import Button from '~/styles/components/Button';

function PhonesComponent(props) {
  const [Phone, setPhone] = useState(props.value);
  const handleChange = useCallback(
    e => {
      setPhone(e.target.value);
      const newPhones = props.globalState;
      newPhones[props.index] = Phone;
      props.function(newPhones);
    },
    [Phone, props]
  );

  return (
    <Input
      placeholder="Numero"
      type="tel"
      value={Phone}
      onChange={handleChange}
      required
    />
  );
}

function EmailsComponent(props) {
  const [Email, setEmail] = useState(props.value);
  const handleChange = useCallback(
    e => {
      setEmail(e.target.value);
      const newEmails = props.globalState;
      newEmails[props.index] = Email;
      props.function(newEmails);
    },
    [Email, props]
  );

  return (
    <Input
      placeholder="E-Mail"
      type="email"
      value={Email}
      onChange={handleChange}
      required
    />
  );
}

function OwnersComponent(props) {
  const [Owner, setOwner] = useState(props.value);
  const handleChange = useCallback(
    e => {
      setOwner(e.target.value);
      const newOwners = props.globalState;
      newOwners[props.index] = Owner;
      props.function(newOwners);
    },
    [Owner, props]
  );

  return (
    <Input
      placeholder="Dono"
      type="text"
      value={Owner}
      onChange={handleChange}
      required
    />
  );
}

export default function ClientRegister() {
  const [Name, setName] = useState('');
  const [CUIT, setCUIT] = useState('');
  const [IsClient, setIsClient] = useState(true);
  const [Phones, setPhones] = useState([]);
  const [Phone, setPhone] = useState('');
  const [Emails, setEmails] = useState([]);
  const [Email, setEmail] = useState('');
  const [Owners, setOwners] = useState([]);
  const [Owner, setOwner] = useState('');

  const [Country, setCountry] = useState('');
  const [State, setState] = useState('');
  const [Address, setAddress] = useState('');
  const [Cep, setCep] = useState('');

  const PostClientsApi = useCallback(async data => {
    // const response = await api.post('client', data);
    await api.post('client', data);
    // console.log(response);

    setName('');
    setCUIT('');
    setIsClient(true);
    setPhones([]);
    setPhone('');
    setEmails([]);
    setEmail('');
    setOwners([]);
    setOwner('');
    setCountry('');
    setState('');
    setAddress('');
    setCep('');
    // TODO: usar responde para la notificacion
  }, []);

  const generateInfo = useCallback((array, name) => {
    const ObjArray = [];
    array.forEach(element => {
      const obj = {};
      const key = name;
      obj[key] = element;
      ObjArray.push(obj);
    });
    return ObjArray;
  }, []);

  const handleSubmit = useCallback(
    async e => {
      // TODO: hacer un dispatch con la info del Cliente
      e.preventDefault();
      const addresses = [
        {
          country: Country,
          state: State,
          address: Address,
          zip_code: Cep,
        },
      ];
      const phone = [...Phones];
      if (Phone) {
        phone.push(Phone);
      }
      const email = [...Emails];
      if (Email) {
        email.push(Email);
      }
      const owner = [...Owners];
      if (Owner) {
        owner.push(Owner);
      }

      const phones = await generateInfo(phone, 'phone');
      const emails = await generateInfo(email, 'mail');
      const owners = await generateInfo(owner, 'owners');

      const data = {
        name: Name,
        CUIT,
        is_client: IsClient,
        addresses,
        phones,
        emails,
        owners,
      };

      // console.log(data);

      PostClientsApi(data);
    },
    [
      Address,
      CUIT,
      Cep,
      Country,
      Email,
      Emails,
      IsClient,
      Name,
      Owner,
      Owners,
      Phone,
      Phones,
      PostClientsApi,
      State,
      generateInfo,
    ]
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>
          <h1>Registro</h1>
        </Title>
        <Form onSubmit={handleSubmit}>
          <h2>Dados do cliente</h2>
          <FormSection>
            <div>
              <span>Nome</span>
              <Input
                placeholder="Nome"
                type="text"
                value={Name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <span>CUIT</span>
              <Input
                placeholder="CUIT"
                type="text"
                value={CUIT}
                onChange={e => setCUIT(e.target.value)}
                required
              />
            </div>
            <div>
              <span>Tipo</span>
              <Select
                value={IsClient}
                onChange={e => setIsClient(e.target.value)}
                required
              >
                <option value="true">Cliente</option>
                <option value="false">Provedor</option>
              </Select>
            </div>
            <div>
              <span>Telefone</span>
              {Phones.map((phone, index) => {
                return (
                  <PhonesComponent
                    key={index}
                    value={phone}
                    index={index}
                    function={setPhones}
                    globalState={Phones}
                  />
                );
              })}
              <Input
                placeholder="Telefone"
                type="tel"
                value={Phone}
                o
                onChange={e => {
                  setPhone(e.target.value);
                }}
                required={!Phones[0]}
              />

              <button
                type="button"
                style={{ background: 'transparent', color: '#fff', border: 0 }}
                onClick={() => {
                  if (Phone !== '') {
                    setPhones([...Phones, Phone]);
                    setPhone('');
                  }
                }}
              >
                Adicionar telefone
              </button>
            </div>

            <div>
              <span>E-mail</span>
              {Emails.map((email, index) => {
                return (
                  <EmailsComponent
                    key={index}
                    value={email}
                    index={index}
                    function={setEmails}
                    globalState={Emails}
                  />
                );
              })}
              <Input
                placeholder="E-Mail"
                type="email"
                value={Email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                required={!Emails[0]}
              />
              <button
                type="button"
                style={{ background: 'transparent', color: '#fff', border: 0 }}
                onClick={() => {
                  if (Email !== '') {
                    setEmails([...Emails, Email]);
                    setEmail('');
                  }
                }}
              >
                Adicionar E-mail
              </button>
            </div>
            <div>
              <span>Contato</span>
              {Owners.map((owner, index) => {
                return (
                  <OwnersComponent
                    key={index}
                    value={owner}
                    index={index}
                    function={setOwners}
                    globalState={Owners}
                  />
                );
              })}
              <Input
                placeholder="Dono"
                type="text"
                value={Owner}
                o
                onChange={e => {
                  setOwner(e.target.value);
                }}
                required={!Owners[0]}
              />

              <button
                type="button"
                style={{ background: 'transparent', color: '#fff', border: 0 }}
                onClick={() => {
                  if (Owner !== '') {
                    setOwners([...Owners, Owner]);
                    setOwner('');
                  }
                }}
              >
                Adicionar contato
              </button>
            </div>
          </FormSection>
          <h2>Localização</h2>
          <FormSection>
            <div>
              <span>País</span>
              <Input
                placeholder="País"
                type="text"
                value={Country}
                onChange={e => setCountry(e.target.value)}
                required
              />
            </div>
            <div>
              <span>Estado</span>
              <Input
                placeholder="Estado"
                type="text"
                value={State}
                onChange={e => setState(e.target.value)}
                required
              />
            </div>
            <div>
              <span>Cidade</span>
              <Input
                placeholder="Cidade"
                type="text"
                value={Address}
                onChange={e => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <span>CEP</span>
              <Input
                placeholder="CEP"
                type="text"
                value={Cep}
                onChange={e => setCep(e.target.value)}
                required
              />
            </div>
          </FormSection>
          <Buttons>
            <Button
              color="black"
              type="button"
              onClick={() => history.goBack()}
            >
              <span>Retornar</span>
            </Button>
            <Button type="submit">
              <span>Adicionar Cliente</span>
            </Button>
          </Buttons>
        </Form>
      </Content>
    </Container>
  );
}
