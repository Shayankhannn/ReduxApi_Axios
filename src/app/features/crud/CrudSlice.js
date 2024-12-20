import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchData = createAsyncThunk("posts/fetchData", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
});

export const crudSlice = createSlice({
    name: "posts",
    initialState: {
        data: [],
        status: 'idle',
        error: null 
    },
    reducers:{
        addPost: (state,action)=>{
            state.data.push(action.payload)

        },
        updatePost: (state,action)=>{
            state.data = state.data.map((post)=>post.id === action.payload.id ? action.payload : post)
        },
        deletePost: (state,action)=>{
            state.data = state.data.filter((post)=>post.id !== action.payload)
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchData.pending,(state)=>{
            state.status = 'loading'

        })
        .addCase(fetchData.fulfilled,(state,action)=>{
            state.status = 'succeeded'
        state.data = action.payload
        })
        .addCase(fetchData.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    } 
})

export const {addPost,updatePost,deletePost} = crudSlice.actions
export default crudSlice.reducer