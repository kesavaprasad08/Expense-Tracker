import { useRef, useState } from "react";
import ListOfExpenses from "./ListOfExpenses";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../redux/expense";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";

const DayToDayExpenses = () => {
  const [changes, setaChanges] = useState(false);
  const [showPremium, setPremium] = useState(false);

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
      <form onSubmit={submitHandler}>
        <h2>Add New Expense</h2>
        <label htmlFor="amount">Amount</label>
        <input type="number" ref={amountRef} />
        <label htmlFor="description">Description</label>
        <input ref={descRef} />
        <label htmlFor="category">Category</label>
        <select name="category" ref={categoryRef}>
          <option value="food">Food</option>
          <option value="rentandutilities">Rent and Utilities</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <button>Submit</button>
      </form>
      <hr />
      <h2>List of Expenses</h2>
      <ul>{expenseItems}</ul>
      <h1>Total Rs.{totalAmount}</h1>
      {showPremium && <button onClick={activatePremiumHandler}>Activate Premium </button>}
    </>
  );
};

export default DayToDayExpenses;
