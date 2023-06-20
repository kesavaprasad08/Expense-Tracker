import { useRef , useContext } from "react";
import ExpenseContext from "../../store/expense-context";

const DayToDayExpenses = () => {
    // console.log('rendered')
    const expCntx = useContext(ExpenseContext);
    const amountRef = useRef();
    const descRef = useRef();
    const categoryRef= useRef();
    
    const submitHandler = async(e) => {
        try{
e.preventDefault();
const amount = amountRef.current.value;
const description = descRef.current.value;
const category = categoryRef.current.value
const obj ={
    key:Math.random(),  
    amount:amount,
    description:description,
    category:category
}
expCntx.addExpense(obj);


        }
        catch(error){
            console.log(error);
        }
    }
    const expenseItems = expCntx.expenses.map((exp)=><p key={exp.id}>{exp.amount}-{exp.description}-{exp.category}</p>)
    return<>
    <form onSubmit={submitHandler}>
        <h2>Add New Expense</h2>
<label htmlFor="amount">Amount</label>
<input type='number' ref={amountRef} />
<label htmlFor="description">Description</label>
<input ref={descRef}/>
<label htmlFor="category">Category</label>
<select  name="category" ref={categoryRef}>
    <option value="food">Food</option>
    <option value="rentandutilities">Rent and Utilities</option>
    <option value="travel">Travel</option>
    <option value="entertainment">Entertainment</option>
  </select>
<button>Submit</button>

    </form>
    <hr/>
    <h2>List of Expenses</h2>
    {expenseItems}
    </>
}

export default DayToDayExpenses;