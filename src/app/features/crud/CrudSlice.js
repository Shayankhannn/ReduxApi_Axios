import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const Api = "https://jsonplaceholder.typicode.com/posts"

export const fetchData = createAsyncThunk("posts/fetchData", async () => {
  const response = await axios.get(Api);
  return response.data.slice(0, 10);
});

export const addData = createAsyncThunk("posts/addData", async (data) => {
  const response = await axios.post(Api,data);
    return response.data;
});

export const updateData = createAsyncThunk("posts/updateData", async (data) => {
    const response = await axios.put(`${Api}/${data.id}`,data);
    return response.data;
});

export const deleteData = createAsyncThunk("posts/deleteData", async(id)=>{
     await axios.delete(`${Api}/${id}`);
    return id;
})

export const crudSlice = createSlice({
    name: "posts",
    initialState: {
        data: [],
        status: 'idle',
        error: null 
    },
    reducers:{
        // addPost: (state,action)=>{
        //     state.data.push(action.payload)

        // },
        // updatePost: (state,action)=>{
        //     state.data = state.data.map((post)=>post.id === action.payload.id ? action.payload : post)
        // },
        // deletePost: (state,action)=>{
        //     state.data = state.data.filter((post)=>post.id !== action.payload)
        // }
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
        .addCase(addData.fulfilled,(state,action)=>{
            state.data.push(action.payload)
        })
        .addCase(updateData.fulfilled,(state,action)=>{
            state.data = state.data.map((post)=> post.id === action.payload.id ? action.payload  : post)
        })
        .addCase(deleteData, (state,action)=>{
            state.data = state.data.filter((post)=>post.id !== action.payload)
        })
        
    } 
})

export const {addPost,updatePost,deletePost} = crudSlice.actions
export default crudSlice.reducer