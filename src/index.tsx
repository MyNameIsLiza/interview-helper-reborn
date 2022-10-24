import axe from '@axe-core/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

import './index.css';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line  no-magic-numbers, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-floating-promises
  axe(React, ReactDOM, 3000);
}

// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
