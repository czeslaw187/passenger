import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const kitchenSlice = createSlice({
    name: 'kitchen',
    initialState: {
        'isLogged': false,
        'logError': '',
        'orderArray': [],
    },
    reducers: {
        login: (state, action) => {
            state.isLogged = action.payload
        },
        logErr: (state, action) => {
            state.logError = action.payload
        },
        addOrder: (state, action) => {
            state.orderArray = [...state.orderArray, action.payload]
        },
        removeOrder: (state, action) => {
            let filtered = state.orderArray.filter(el => el.orderId != action.payload)
            state.orderArray = filtered
        },
        clearOrders: (state, action) => {
            state.orderArray = []
        },
        changeState: (state, action) => {
            let index = state.orderArray.findIndex(el=>el.orderId == action.payload[0])
            state.orderArray[index].state = action.payload[1]
        }
    }
})

export default kitchenSlice.reducer

export const {login, logErr, addOrder, removeOrder, clearOrders, changeState} = kitchenSlice.actions

export const fetchCredentials = (input) => async dispatch =>{
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/admin/getCredentials', {credentials: input}).then(resp=>{dispatch(login(resp.data.login)); dispatch(logErr(resp.data.err))})
    } catch (error) {
        return console.log({message: error.message})
    }
}

