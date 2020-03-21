import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.less';
import Routes from '@/routes';

ReactDOM.render(
  <Routes />,
  document.getElementById('root'),
);
// registerServiceWorker();
