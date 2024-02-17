import { createSlice } from "@reduxjs/toolkit";
const initialStateCustomer = {
    fullName:"",
    nationalID:"",
    createdAt:""
}

const customerSlice = createSlice({
    name:"customer",
    initialState:initialStateCustomer,
    reducers:{
       createCustomer:{
        prepare(fullName,nationalID){
            return {
                payload:{fullName,nationalID,createAt:new Date().toISOString()}
            }
        },
        reducer(state,action){
            state.fullName = action.payload.fullName;
            state.nationalID = action.payload.nationalID;
            state.createdAt = action.payload.createAt;
        }
       },
       updateName(state,action){
        state.fullName = action.payload;
       }
    }
});

export default customerSlice.reducer;
export const {createCustomer,updateName} = customerSlice.actions;
// export default function customerReducer(state=initialStateCustomer,action){
//     switch (action.type) {
//         case "customer/createCustomer":
            
//             return {...state,fullName:action.payload.fullName,nationalID:action.payload.nationalID,createAt:action.payload.createAt};
//         case "customer/updateName":
//             return {...state,fullName:action.payload}
//         default:
//             return state;
//     }
// }

// export function createCustomer(fullName,nationalID){
//     return {type:"customer/createCustomer",payload:{fullName,nationalID,createAt:new Date().toISOString()}}
// }

// export function updateName(fullName){
//     return {type:"customer/updateName",payload:fullName}
// }