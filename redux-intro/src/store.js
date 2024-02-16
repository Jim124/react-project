import { createStore,combineReducers } from "redux";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
const rootReducer = combineReducers({
    account:accountReducer,
    customer:customerReducer
});
const store = createStore(rootReducer);
// store.dispatch({type:"account/deposit",payload:500});
// store.dispatch({type:"account/withdraw",payload:200});
// store.dispatch({type:"account/requestLoan",payload:{amount:1000,purpose:"buy a car"}});
// store.dispatch({type:"account/payLoan"});
// console.log(store.getState());


// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// store.dispatch(requestLoan(1000,"Buy a cheap car"));
// store.dispatch(payLoan());
// console.log(store.getState());



// store.dispatch(createCustomer("Jim",23242452));
// console.log(store.getState())
export default store;
