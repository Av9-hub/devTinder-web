import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeFeed:(state,action)=>{
            const newFeed=state.filter((i)=>i._id!=action.payload);
            return newFeed;
        },
        clearFeed:(state,action)=>null,
    }
})

export const {addFeed,removeFeed,clearFeed}=feedSlice.actions;
export default feedSlice.reducer;