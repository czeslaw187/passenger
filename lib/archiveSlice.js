import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const archiveSlice = createSlice({
    name: 'archive',
    initialState: {
        'archive': []
    },
    reducers: {
        fetchArchives: (state, action) => {
            state.archive = action.payload
        }
    }
})

export default archiveSlice.reducer

export const {fetchArchives} = archiveSlice.actions

export const insertArchive = (obj) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/admin/insertIntoArchive', {obj}).then(resp=>{console.log(resp)})
    } catch (error) {
        return console.log({message: error.message})
    }
}

export const getAllArchives = () => async dispatch => {
    try {
        await axios.get(process.env.NEXT_PUBLIC_URL + '/api/admin/getArchive').then(resp=>{dispatch(fetchArchives(resp.data))})
    } catch (error) {
        return console.log({message: error.message})
    }
}