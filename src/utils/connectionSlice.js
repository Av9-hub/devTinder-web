import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addConnection:(state,action)=>{
            return action.payload;
        },
        clearConnection:(state,action)=>{
            return null;
        },
        
    }
})

export const {addConnection,clearConnection}=connectionSlice.actions;
export default connectionSlice.reducer;