import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import Routing from './pages/Routing';
import Header from './pages/main/component/Header';
import Footer from './pages/main/component/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Routing />
    <Footer />
  </React.StrictMode>
);
