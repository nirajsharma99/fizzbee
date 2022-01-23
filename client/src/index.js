import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './components/store/store';

const ProviderComponent = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<ProviderComponent />, document.getElementById('root'));
