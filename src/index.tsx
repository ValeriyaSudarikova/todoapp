import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './core/store/to-do-slice';
import './index.css';
import App from './App';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);