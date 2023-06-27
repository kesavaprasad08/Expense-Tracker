import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/UI/Button/Layout/Layout";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUspage";
import AuthPage from "./pages/AuthPage";
import ProductsPage from "./pages/ProductsPage";
import WelcomePage from "./pages/WelcomePage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import DayToDayExpenses from "./pages/Expense/DayToDayExpenses";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { themeActions } from "./redux/theme";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isPremium = useSelector((state)=> state.expense.isPremiumSubscribed);
const isDarkTheme = useSelector((state)=> state.theme.isDarkTheme);
const expenses = useSelector((state)=>state.expense.expenses);
  const toggleThemeHandler = () => {
dispatch(themeActions.changeTheme());
  }

  const downloadHandler = () => {
    function convertToCSV(items) {
      const headers = ['Amount', 'Description', 'Category'];
      const rows = expenses.map(item => [item.amount, item.description, item.category]);
      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      return csv;
    }
    const data =convertToCSV();
    const blob= new Blob([data]);
    const download =document.getElementById('download');
    download.href=URL.createObjectURL(blob);
    
  }

  return (
    <div className={isDarkTheme ? "App dark" : "App"}>
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Route path="/aboutus" exact>
          <AboutUsPage />
        </Route>
        <Route path="/products" exact>
          <ProductsPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        {isLoggedIn && (
          <Route path="/welcome" exact>
            <WelcomePage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/completeprofile" exact>
            <CompleteProfilePage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/expense" exact>
            <DayToDayExpenses />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
        <div className="app">
          <h1>Hi there!</h1>
        </div>
      </Switch>
      {isPremium && <button onClick={toggleThemeHandler}>toggle theme</button>}
      {isPremium && <a id='download' download='file.csv' href='/' > <button onClick={downloadHandler}>Download File</button></a>}
    </Layout>
    </div>
  );
}

export default App;
