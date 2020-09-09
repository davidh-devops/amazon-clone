import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppProvider from './AppProvider';
import reducer, { initialState, createAction, actions } from './reducer';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider reducer={reducer} initialState={initialState}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
