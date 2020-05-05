import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
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
            <Route exact path='/' component={Home} />
            <Route path='/thermo' component={Thermo} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/calendar' component={Calendar} />
      </Layout>
    );
  }
}
