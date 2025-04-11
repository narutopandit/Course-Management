import { createSlice } from "@reduxjs/toolkit"

 //intial state
 const authSlice = createSlice({
    name: 'auth',
    initialState:{
        token:localStorage.getItem('token')||null,
    },
    //Reducers
    reducers:{
        loginAction: (state, action)=>{
            state.token = action.payload;
        }
    }
 })

 export const {loginAction} = authSlice.actions;

 const authReducer = authSlice.reducer;
 export default authReducer;