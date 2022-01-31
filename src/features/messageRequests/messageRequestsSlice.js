import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';


const initialState = {
    pendings: [],
    confirmations: [],
    errors: null,
    loading: false,
    requestSent: '',
};

export const connect = createAsyncThunk('connections/connect', async (id, {rejectWithValue}) => {
    try {
        const result =  await axiosInstance.post(`connections/${id}`);
        return result.data.data;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const confirmedConnections = createAsyncThunk('connections/confirmed', async () => {
    try {
        const result =  await axiosInstance.get(`connections/confirmed`);
        return result.data.data;
    } catch (err) {
        return err;
    }
});

export const pendingConnections = createAsyncThunk('connections/pending', async () => {
    try {
        const result =  await axiosInstance.get(`connections/pending`);
        return result.data.data;
    } catch (err) {
        return err;
    }
});

export const changeRequestStatus = createAsyncThunk('connections/:id', async ({id, param }, {rejectWithValue}) => {
    try {
        const updated =  await axiosInstance.put(`connections/${id}`, param);
        const ID = updated.data.data._id;
        console.log(ID, updated);
        return param.connect === 'rejected' ? {ID, connect: 'rejected'} : {ID};
    } catch (err) {
        return rejectWithValue(err);
    }
});

const connectionSlice = createSlice({
    name: 'connections',
    initialState,
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
            console.log(payload);
            state.confirmations = payload;
            state.loading = false;
        },
        [confirmedConnections.rejected]: (state, {payload}) => {
            state.errors = payload;
            state.loading = false;
        },
        [changeRequestStatus.pending]: (state) => {
            state.loading = true;
        },
        [changeRequestStatus.fulfilled]: (state, {payload}) => {
            if(!payload.connect) {
                const { from } = current(state.pendings).find(item => item._id === payload.ID);
                console.log(from);
                state.confirmations=[from,...current(state.confirmations)];
            }
            state.pendings = current(state.pendings).filter(item => item._id !== payload.ID);
            state.loading = false;
        },
        [changeRequestStatus.rejected]: (state, {payload}) => {
            state.errors = payload;
            state.loading = false;
        },
    }
});

export default connectionSlice.reducer;