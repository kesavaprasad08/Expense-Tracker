import React, { useContext } from 'react';
import { Switch, Route  } from 'react-router-dom';

import './App.css';
import Layout from './components/UI/Button/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUspage';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import AuthContext from './store/auth-context';
import WelcomePage from './pages/WelcomePage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import CompleteProfilePage from './pages/CompleteProfilePage';

function App() {

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
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
        {isLoggedIn && (<Route path='/welcome' exact>
          <WelcomePage />
        </Route>)}
        {isLoggedIn &&(<Route path='/completeprofile' exact>
          <CompleteProfilePage/>
        </Route>)}
        <Route path='*'>
          <Redirect to='/'>

          </Redirect>
        </Route>
    <div className="app">
      <h1>Hi there!</h1>
    </div>
    </Switch>
    </Layout>
  );
}

export default App;
