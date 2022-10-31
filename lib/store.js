import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import newReducer from '../lib/newSlice'

export const store = () => configureStore({
    reducer: {
        food: newReducer
    }
})

export const wrapper = createWrapper(store)