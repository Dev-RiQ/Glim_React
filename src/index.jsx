import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import './assets/style/dark.css';
import Routing from './pages/Routing';
import Header from './pages/main/component/Header';
import Footer from './pages/main/component/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header />
    <Routing />
    <Footer />
  </>
);
