import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
// import { getLocalStorage } from '../../helpers/localStorage';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async function ( params ,{rejectWithValue}) {
        try {
            let result =  await axiosInstance.get(`users`, { params }, );
            return result.data.data;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        pageTotal: 0,
        loading: false,
        errors: null
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
           state.loading = true
        },
        [getUsers.fulfilled]: (state, {payload}) => {
            state.users = payload.usersRes;
            state.pageTotal = payload.totalCount;
            state.loading = false;
        },
        [getUsers.rejected]: (state, {payload}) => {
            state.errors = payload.errors;
            state.loading = false
        }
    }
})

export default userSlice.reducer;