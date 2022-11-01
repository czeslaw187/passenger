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

export const fetchFullMenu = () => async dispatch => {
    try {
        await axios.get(process.env.NEXT_PUBLIC_URL + '/api/getAllFoodItems').then(response=>dispatch(setMenu(response.data)))
    } catch (error) {
        return console.log(error.message)
    }
}
