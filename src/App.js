import React from 'react';
import { Switch, Route  } from 'react-router-dom';

import './App.css';
import Layout from './components/UI/Button/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUspage';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (

    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth' exact>
          <AuthPage />
        </Route>
        <Route path='/aboutus' exact>
          <AboutUsPage />
        </Route>
        <Route path='/products' exact>
          <ProductsPage />
        </Route>
    <div className="app">
      <h1>Hi there!</h1>
    </div>
    </Switch>
    </Layout>
  );
}

export default App;
