import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [changes,setChanges]=useState(true);

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
  },[changes]);

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
    // const updatedExpenses = [...expenses, expense];
    // setExpenses(updatedExpenses);
    //     fetch('https://authentication-bd40d-default-rtdb.firebaseio.com/expenses',{
    //     method: "POST",
    //     body: JSON.stringify(expense),
    //     headers: {
    //       "Content-Type": "application/json",
    //     }
    // }
    //   )
    //   .then((res)=>{
    //     console.log(res);
    //   })
    //   .catch((Err)=>{
    //     console.log(Err);
    //   })
  };
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
