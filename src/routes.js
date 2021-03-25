import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Galery from './pages/Galery';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/galery" component={Galery} />
        <Route path="/contato" component={Contact} />
      </Switch>
    </BrowserRouter>
  );
}
