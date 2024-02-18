import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import { router } from './App.tsx';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/app/store.ts';
import { RouterProvider } from 'react-router-dom';
import { Toast } from '@/components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <Toast />
    </ReduxProvider>
  </React.StrictMode>
);
