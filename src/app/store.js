import { configureStore } from "@reduxjs/toolkit";
import { crudSlice } from "./features/crud/CrudSlice";



    export const store = configureStore({
        reducer: {
            posts : crudSlice
    }})