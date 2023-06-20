// import axios from "axios";
import ExpenseContext from "../../store/expense-context";
import { useContext, useState, useRef } from "react";

const ListOfExpenses = (props) => {
  const [isEditing, setEditing] = useState(false);
  const expenseContext = useContext(ExpenseContext);
  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  const deleteHandler = () => {
    expenseContext.deleteExpense(props.id);
  };
  const EditHandler = () => {
    setEditing(true);
//     console.log("edit");
//     amountRef.current.value=props.amount;
//     descRef.current.value = props.description;
// categoryRef.current.value = props.category;

  };
  const cancelHandler = () => {
    setEditing(false);
  };

 const EditOnDatabase = (e) =>{
    e.preventDefault();
    const obj ={
        id:props.id,
        amount:amountRef.current.value,
        description:descRef.current.value,
        category:categoryRef.current.value
    }
    expenseContext.editExpense(obj);
    setEditing(false);
 }

  return (
    <>
      <li key={props.id}>
        {props.description}-{props.category}-{props.amount}
        <button onClick={deleteHandler}>delete</button>
        {!isEditing && <button onClick={EditHandler}>Edit</button>}
        {isEditing && <button onClick={cancelHandler}>Cancel</button>}
        {isEditing && (
          <form onSubmit={EditOnDatabase}>
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
    </>
  );
};

export default ListOfExpenses;
