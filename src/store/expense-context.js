import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  editExpense: (expense) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [changes, setChanges] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://authentication-bd40d-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((res) => {
        const data = res.data;
        const loadedExpenses = [];

        for (const key in data) {
          loadedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
        }
        setExpenses(loadedExpenses);
      });
  }, [changes]);

  const addExpenseHandler = (expense) => {
    const url =
      "https://authentication-bd40d-default-rtdb.firebaseio.com/expenses";
    axios
      .post(`${url}.json`, expense)
      .then((res) => {
        setChanges(!changes);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteExpenseHandler = (id) => {
    axios
      .delete(
        `https://authentication-bd40d-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((res) => {
        console.log("Expense successfully deleted");
        setChanges(!changes);
      });
  };
  const editExpenseHandler = (obj) => {
    axios
      .put(
        `https://authentication-bd40d-default-rtdb.firebaseio.com/expenses/${obj.id}.json`,
        obj
      )
      .then((res) => {
        console.log(res);
        setChanges(!changes);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    editExpense: editExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
