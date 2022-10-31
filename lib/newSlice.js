import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const newSlice = createSlice({
    name: 'food',
    initialState: {
        'food':[],
    },
    reducers: {
        setMenu: (state, action) => {
            state.food = action.payload
        }
    }
})

export default newSlice.reducer

export const {setMenu} = newSlice.actions

