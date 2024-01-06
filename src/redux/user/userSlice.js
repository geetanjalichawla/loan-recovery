import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    dashBoardData:[{}]
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            // localStorage.setItem(action.payload.user.token);
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        dashBoard : (state,action)=>{
            state.dashBoardData=action.payload
        }
    }
})

export const { signInStart, signInFailure, signInSuccess ,dashBoard} = userSlice.actions;
export default userSlice.reducer;