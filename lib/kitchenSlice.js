import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const kitchenSlice = createSlice({
    name: 'kitchen',
    initialState: {
        'isLogged': false,
        'logError': ''
    },
    reducers: {
        login: (state, action) => {
            state.isLogged = action.payload
        },
        logErr: (state, action) => {
            state.logError = action.payload
        }
    }
})

export default kitchenSlice.reducer

export const {login, logErr} = kitchenSlice.actions

export const fetchCredentials = (input) => async dispatch =>{
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/admin/getCredentials', {credentials: input}).then(resp=>{console.log(resp.data,'action'); dispatch(login(resp.data.login)); dispatch(logErr(resp.data.err))})
    } catch (error) {
        console.log({message: error.message})
    }
}