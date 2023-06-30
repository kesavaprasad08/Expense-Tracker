import { useRef, useState } from "react";
import ListOfExpenses from "./ListOfExpenses";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../redux/expense";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { themeActions } from "../../redux/theme";
import classes from './DayToDayExpenses.module.css'

const DayToDayExpenses = () => {
  const [changes, setaChanges] = useState(false);
  const [showPremium, setPremium] = useState(false);
  const expenses = useSelector((state)=>state.expense.expenses);

  const expe = useSelector((state) => state.expense.expenses);
  const isPremium = useSelector((state)=> state.expense.isPremiumSubscribed);


  const dispatch = useDispatch();
  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const amount = amountRef.current.value;
      const description = descRef.current.value;
      const category = categoryRef.current.value;
      const obj = {
        key: Math.random(),
        amount: amount,
        description: description,
        category: category,
      };
      await axios.post(
        "https://authentication-bd40d-default-rtdb.firebaseio.com/expenses.json",
        obj
      );
      gettingDatas();
    } catch (error) {
      console.log(error);
    }
  };

  const gettingDatas = async () => {
    try {
      const response = await axios.get(
        `https://authentication-bd40d-default-rtdb.firebaseio.com/expenses.json`
      );
      const data = await response.data;
      const loadedExpenses = [];
      let total = 0;

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          amount: data[key].amount,
          description: data[key].description,
          category: data[key].category,
        });
        total = total + Number(data[key].amount);
      }
      dispatch(expenseActions.updateTotal(total));

      dispatch(expenseActions.addExpensesToState(loadedExpenses));

      if (total > 10000) {
        setPremium(true);
      }
    } catch (err) {}
  };
  useEffect(() => {
    const gettingData = async () => {
      try {
        const response = await axios.get(
          `https://authentication-bd40d-default-rtdb.firebaseio.com/expenses.json`
        );
        const data = await response.data;
        const loadedExpenses = [];
        let total = 0;

        for (const key in data) {
          loadedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
          total = total + Number(data[key].amount);
        }
        dispatch(expenseActions.updateTotal(total));
        dispatch(expenseActions.addExpensesToState(loadedExpenses));

        if (total > 10000 && !isPremium) {
          setPremium(true);
        }
        else{
            setPremium(false);
        }
      } catch (err) {}
    };
    gettingData();
  }, [changes, dispatch,setPremium,isPremium]);

  const changeHandler = () => {
    setaChanges(!changes);
  };

  const activatePremiumHandler=() => {
    dispatch(expenseActions.updatePremiumSubscription());
    
  }
  
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
  const expenseItems = expe.map((exp) => (
    <ListOfExpenses
      key={exp.id}
      id={exp.id}
      amount={exp.amount}
      description={exp.description}
      category={exp.category}
      onUpdate={changeHandler}
    />
  ));
const totalAmount =useSelector((state)=>state.expense.total)
  return (
    <>
      <form onSubmit={submitHandler} className={classes.form}>
        <h2>Add New Expense</h2>
        <label htmlFor="amount">Amount Rs. :</label>
        <input type="number" ref={amountRef} />
        <label htmlFor="description">Description :</label>
        <input ref={descRef} />
        <label htmlFor="category">Category :</label>
        <select name="category" ref={categoryRef}>
          <option value="food">Food</option>
          <option value="rentandutilities">Rent and Utilities</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <button>Submit</button>
      </form>
      <hr />
      <div className={classes.listOfExpenses}> 
      <h2 className={classes.header}>List of Expenses</h2>
      <ul>
        <li className={classes.listHeader}>
          <div>Description </div>
          <div>Category </div>
          <div>Amount Rs. </div>
          <div>Delete Expense </div>
          <div>Edit Expense </div>
        </li>
        {expenseItems}</ul>
      <h1 className={classes.total}>Total Rs.{totalAmount}</h1>
      </div>
      <div className={classes.Fbuttons} >
      {showPremium && <button className={classes.Fbutton} onClick={activatePremiumHandler}>Activate Premium </button>}
      {isPremium && <button className={classes.Fbutton} onClick={toggleThemeHandler}>Toggle theme</button>}
      {isPremium && <a id='download' download='file.csv' href='/' > <button className={classes.Fbutton} onClick={downloadHandler}>Download File</button></a>}
      </div>
    </>
  );
};

export default DayToDayExpenses;
