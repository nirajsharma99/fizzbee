import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DataHandler } from './components/contextapi/DataHandler';
import reducer, { initialState } from './components/contextapi/reducer';

ReactDOM.render(
  <DataHandler initialState={initialState} reducer={reducer}>
    <App />
  </DataHandler>,
  document.getElementById('root')
);
