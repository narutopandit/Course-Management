import { createSlice } from "@reduxjs/toolkit"


 //intial state
 const authSlice = createSlice({
    name: 'auth',
    initialState:{
        userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null,
    },
    //Reducers
    reducers:{
        loginAction: (state, action)=>{
            // console.log(action.payload);
            state.userInfo = action.payload;
        }
    }
 })

 export const {loginAction} = authSlice.actions;

 const authReducer = authSlice.reducer;
 export default authReducer;