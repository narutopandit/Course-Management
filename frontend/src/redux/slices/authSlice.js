import { createSlice } from "@reduxjs/toolkit"

 //intial state
 const authSlice = createSlice({
    name: 'auth',
    initialState:{
        userAuth:null,
    },
    //Reducers
    reducers:{
        loginAction: (state, action)=>{
            state.userAuth = action.payload;
        }
    }
 })

 export const {loginAction} = authSlice.actions;

 const authReducer = authSlice.reducer;
 export default authReducer;