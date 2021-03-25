import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import history from './history';

import Private from './private';
import Guest from './guest';
import Admin from './admin';

import Login from '../pages/Login/index';
import Workers from '../pages/Workers/index';
import Clients from '../pages/Clients/index';
import ClientRegister from '../pages/ClientRegister/index';
import Dashboard from '~/pages/Dashboard/index';
import Inventory from '~/pages/Inventory/index';
import Remittance from '~/pages/Remittance/index';
import OrderRegister from '~/pages/OrderRegister/index';
import Orders from '~/pages/Orders/index';
import UserConfig from '~/pages/UserConfig/index';
import WorkersRegister from '~/pages/WorkersRegister/index';

export default function Routes() {
  return (
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Guest path="/login" component={Login} />
          <Private path="/" exact component={Dashboard} />
          <Admin path="/workers" component={Workers} />
          <Private path="/clients" component={Clients} />
          <Private path="/clientregister" component={ClientRegister} />
          <Private path="/inventory" component={Inventory} />
          <Private path="/remittance" component={Remittance} />
          <Private path="/orderregister" component={OrderRegister} />
          <Private path="/orders" component={Orders} />
          <Admin path="/userconfig" component={UserConfig} />
          <Admin path="/workersregister" component={WorkersRegister} />
        </Switch>
      </>
    </ConnectedRouter>
  );
}
