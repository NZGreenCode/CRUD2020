import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Customer } from './components/Customer';
import { Product } from './components/Product';
import { Store} from './components/Store';
import { Sale} from './components/Sale';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Customer} />
        <Route path='/Product' component={Product} />
        <Route path='/Store' component={Store} />
        <Route path='/Sale' component={Sale} />

      </Layout>
    );
  }
}
