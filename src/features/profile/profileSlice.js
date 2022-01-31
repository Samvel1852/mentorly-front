import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../helpers/axiosInstance';

const initialState = {
    userData: null,
    editLoader: false,
}

export const getUserData = createAsyncThunk('users/getUser', async (id, {rejectWithValue}) => {
    try {
        let userData =  await axiosInstance.get(`users/${id}`);
        console.log('userData', userData.data.data[0])
        return userData.data.data[0];
    } catch (err) {
        return rejectWithValue(err)
    }
})

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: {
        [getUserData.pending]: (state) => {
           state.editLoader = true
        },
        [getUserData.fulfilled]: (state, {payload}) => {
            state.userData = payload;
            state.editLoader = false;
        },
        [getUserData.rejected]: (state) => {
            state.editLoader = false
        },
    }
});

export default profileSlice.reducer