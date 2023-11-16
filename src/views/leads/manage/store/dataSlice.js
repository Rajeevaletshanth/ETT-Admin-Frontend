import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllLead, updateAccessControl } from 'services/ApiService'

export const getLeadsData = createAsyncThunk('manageLeads/data/getLeadsData',async () => {
    const response = await getAllLead()
    return response.data
})

export const putLeadsData = createAsyncThunk('manageLeads/data/putLeadsData',async (data) => {
    const response = await updateAccessControl(data)
    return response.data 
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageLeads/data',
    initialState: {
        loading: true,
        leadsData: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getLeadsData.fulfilled]: (state, action) => {
            state.leadsData = action.payload
            state.loading = false
        },
        [getLeadsData.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
