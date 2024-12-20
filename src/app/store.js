import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "../app/features/crud/CrudSlice";



    export const store = configureStore({
        reducer: {
            posts : crudReducer
    }})