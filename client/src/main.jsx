import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './app/api/apiSlice.js';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { SnackbarProvider } from 'notistack';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider autoHideDuration={3000} preventDuplicate>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
