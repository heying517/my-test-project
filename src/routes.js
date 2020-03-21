/* eslint-disable no-undef, react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Provider } from 'mobx-react';
import store from '@/store';

import Home from '@/pages/home';
import About from '@/pages/about';
import NotFound404 from '@/pages/not-found-404';

export default () => (
  <Provider {...store}>
    <Router basename={G.root}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound404} />
      </Switch>
    </Router>
  </Provider>
);
