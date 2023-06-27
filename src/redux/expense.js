import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  total:0,
  isPremiumSubscribed:false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpensesToState(state, action) {
      state.expenses = action.payload;
    },
    addExpenseToState(state, action) {
      state.expenses = [...state.expenses, action.payload];
    },
    updateTotal(state,action){
      state.total =action.payload;
    },
    updatePremiumSubscription(state){
      state.isPremiumSubscribed=true;
    }
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
