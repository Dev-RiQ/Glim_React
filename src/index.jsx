import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main/index.css';
import Routing from './pages/Routing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
