import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUnverifiedUsers, verifyUser } from 'services/ApiService'

export const getVerificationList = createAsyncThunk('verificationList/data/getVerificationList',async () => {
    const response = await getUnverifiedUsers()
    return response.data
})

export const putVerifiedData = createAsyncThunk('verificationList/data/putVerifiedData',async (id) => {
    const response = await verifyUser(id)
    return response.data 
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'verificationList/data',
    initialState: {
        loading: true,
        verificationListData: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getVerificationList.fulfilled]: (state, action) => {
            state.verificationListData = action.payload
            state.loading = false
        },
        [getVerificationList.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
