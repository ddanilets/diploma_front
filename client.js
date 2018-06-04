import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './sass/main.scss';
import configureStore from './redux/configureStore';
import App from './components/App';

const mountNode = document.getElementById('app');
const { store } = configureStore(createBrowserHistory(), window.App);
window.React = ReactDOM;

ReactDOM.hydrate(
  <Provider store={store} key="provider">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  mountNode,
);
