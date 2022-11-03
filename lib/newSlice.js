import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const newSlice = createSlice({
    name: 'food',
    initialState: {
        'food':[],
        'activePage': "",
        'order': []
    },
    reducers: {
        setMenu: (state, action) => {
            state.food = action.payload
        },
        setPage: (state, action) => {
            state.activePage = action.payload
        },
        setOrder: (state, action) => {
            state.order = [...state.order, action.payload]
        },
        resetOrder: (state, action) => {
            state.order = []
        }
    }
})

export default newSlice.reducer

export const {setMenu, setPage, setOrder, resetOrder} = newSlice.actions

export const fetchFullMenu = () => async dispatch => {
    try {
        await axios.get(process.env.NEXT_PUBLIC_URL + '/api/getAllFoodItems').then(response=>{dispatch(setMenu(response.data))})
    } catch (error) {
        return console.log(error.message)
    }
}
