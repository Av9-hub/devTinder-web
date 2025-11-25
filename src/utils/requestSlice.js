import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
            const newArray=state.filter((r)=>r._id!=action.payload);
            return newArray;
        },
        clearRequest:(state,action)=>null,
    }
})

export const {addRequest,removeRequest,clearRequest}=requestSlice.actions;
export default requestSlice.reducer;