import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const kitchenSlice = createSlice({
    name: 'kitchen',
    initialState: {
        'isLogged': false,
        'logError': '',
        'orderArray': []
    },
    reducers: {
        login: (state, action) => {
            state.isLogged = action.payload
        },
        logErr: (state, action) => {
            state.logError = action.payload
        },
        addOrder: (state, action) => {
            console.log(action.payload,'action')
            state.orderArray = [...state.orderArray, action.payload]
        },
        removeOrder: (state, action) => {
            let filtered = state.orderArray.filter(el => el.id != action.payload)
            state.orderArray = filtered
        },
        clearOrders: (state, action) => {
            state.orderArray = []
        }
    }
})

export default kitchenSlice.reducer

export const {login, logErr, addOrder, removeOrder, clearOrders} = kitchenSlice.actions

export const fetchCredentials = (input) => async dispatch =>{
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/admin/getCredentials', {credentials: input}).then(resp=>{dispatch(login(resp.data.login)); dispatch(logErr(resp.data.err))})
    } catch (error) {
        console.log({message: error.message})
    }
}