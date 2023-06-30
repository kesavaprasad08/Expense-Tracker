import { useState, useRef } from "react";
import axios from "axios";
import classes from './ListOfExpenses.module.css';
const ListOfExpenses = (props) => {
  const [isEditing, setEditing] = useState(false);
  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  const deleteHandler = () => {
    axios
      .delete(
        `https://authentication-bd40d-default-rtdb.firebaseio.com/expenses/${props.id}.json`
      )
      .then((res) => {
        console.log("Expense successfully deleted");
        props.onUpdate();
      });
  };
  const EditHandler = () => {
    setEditing(true);
  };
  const cancelHandler = () => {
    setEditing(false);
  };

  const EditOnDatabase = (e) => {
    e.preventDefault();
    const obj = {
      id: props.id,
      amount: amountRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
    };

    axios
      .put(
        `https://authentication-bd40d-default-rtdb.firebaseio.com/expenses/${obj.id}.json`,
        obj
      )
      .then((res) => {
        props.onUpdate();
      })
      .catch((res) => {
        console.log(res);
      });

    setEditing(false);
  };

  return (
    
      <li key={props.id} className={classes.expense}>
        <div >{props.description}</div>
        <div>{props.category}</div>
        <div>{props.amount}</div>
        <button onClick={deleteHandler}>delete</button>
        {!isEditing && <button onClick={EditHandler}>Edit</button>}
        {isEditing && <button onClick={cancelHandler}>Cancel</button>}
        {isEditing && (
          <form onSubmit={EditOnDatabase} className={classes.editForm}>
            <label htmlFor="amount">Amount</label>
            <input type="number" ref={amountRef} />
            <label htmlFor="description">Description</label>
            <input ref={descRef} />
            <label htmlFor="category">Category</label>
            <select name="category" ref={categoryRef}>
              <option value="food">Food</option>
              <option value="rent and utilities">Rent and Utilities</option>
              <option value="travel">Travel</option>
              <option value="entertainment">Entertainment</option>
            </select>
            <button>Submit</button>
          </form>
        )}
      </li>
    
  );
};

export default ListOfExpenses;
