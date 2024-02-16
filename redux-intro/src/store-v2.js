import { createStore,combineReducers, applyMiddleware } from "redux";
import {thunk}  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
const rootReducer = combineReducers({
    account:accountReducer,
    customer:customerReducer
});
// npm i redux-devtools-extension --force use devtools
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;
