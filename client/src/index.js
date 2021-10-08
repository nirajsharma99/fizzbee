import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataHandler } from './components/contextapi/DataHandler';
import reducer, { initialState } from './components/contextapi/reducer';

ReactDOM.render(
  <DataHandler initialState={initialState} reducer={reducer}>
    <App />
  </DataHandler>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
