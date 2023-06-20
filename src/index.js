import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { ExpenseContextProvider } from "./store/expense-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ExpenseContextProvider>
      <App />
      </ExpenseContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
