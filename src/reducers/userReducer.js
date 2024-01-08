import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {
    message:"",
    error:""
  },
  {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setError : (state, action) =>{
      state.error = action.payload
    },
    setMessage : (state, action) =>{
      state.message = action.payload
    },
  }
);