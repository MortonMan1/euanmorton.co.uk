import React, { Component } from 'react';
import { Route } from 'react-router';
import PrivateRoute from './components/PrivateRoute'

import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Thermo } from './components/Thermo';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Calendar } from './components/Calendar';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute path='/thermo' component={Thermo} />
            <PrivateRoute path='/counter' component={Counter} />
            <PrivateRoute path='/fetch-data' component={FetchData} />
            <PrivateRoute path='/calendar' component={Calendar} />
      </Layout>
    );
  }
}
