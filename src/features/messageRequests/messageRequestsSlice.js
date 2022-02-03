import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';


const initialState = {
    pendings: [],
    confirmations: [],
    errors: null,
    loading: false,
    requestSent: '',
    pendingsCount: 0,
};

export const connect = createAsyncThunk('connections/connect', async (id,{rejectWithValue}) => {
    try {
        const result =  await axiosInstance.post(`connections/${id}`);
        return result.data.data;
    } catch (err) {
        return rejectWithValue(err.response.data.errors);
    }
});

export const confirmedConnections = createAsyncThunk('connections/confirmed', async ( params, {rejectWithValue}) => {
    try {
        const result =  await axiosInstance.get(`connections/confirmed`);
        return result.data.data;
    } catch (err) {
        return rejectWithValue(err.response.data.errors);
    }
});

export const pendingConnections = createAsyncThunk('connections/pending', async (params, {rejectWithValue}) => {
    try {
        const result =  await axiosInstance.get(`connections/pending`);
        return result.data.data;
    } catch (err) {
        return rejectWithValue(err.response.data.errors);
    }
});

export const changeRequestStatus = createAsyncThunk('connections/:id', async ({id, param }, {rejectWithValue}) => {
    try {
        const updated = await axiosInstance.put(`connections/${id}`, param);
        return updated;
    } catch (err) {
        return rejectWithValue(err.response.data.errors);
    }
});

const connectionSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {
        clearRequestSent: (state) => {
            state.requestSent = '';
        },
        clearErrorsInMessages: (state) => {
            state.errors = null;
        }
    },
    extraReducers: {
        [connect.pending]: (state) => {
            state.loading = true;
        },
        [connect.fulfilled]: (state) => {
            state.requestSent = 'Request Sent';
            state.loading = false;
        },
        [connect.rejected]: (state, {payload}) => {
            state.loading = false;
            state.errors = payload;
        },
        [pendingConnections.pending]: (state) => {
           state.loading = true;
        },
        [pendingConnections.fulfilled]: (state, {payload}) => {
           state.pendings = payload;
           state.pendingsCount = payload.length;
           state.loading = false;
        },
        [pendingConnections.rejected]: (state, {payload}) => {
           state.errors = payload;
           state.loading = false;
        },
        [confirmedConnections.pending]: (state) => {
           state.loading = true;
        },
        [confirmedConnections.fulfilled]: (state, {payload}) => {
           state.confirmations = payload;
           state.loading = false;
        },
        [confirmedConnections.rejected]: (state, {payload}) => {
           state.errors = payload;
           state.loading = false;
        },
        [changeRequestStatus.rejected]: (state) => {
           state.errors = 'Something went wrong';
        },
    }
});

export const {
    clearRequestSent,
    clearErrorsInMessages,
} = connectionSlice.actions;

export default connectionSlice.reducer;