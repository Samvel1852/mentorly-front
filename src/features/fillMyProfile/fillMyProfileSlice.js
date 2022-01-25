import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { myAxios } from '../../helpers/axiosInstance';
import { getLocalStorage } from '../../helpers/localStorage';

const initialState = {
  firstName: '',
  lastName: '',
  selectedRole: '',
  selectedField: '',
  position: '',
  experience: '',
  education: '',
  about: '',
  plans: '',
  skillName: '',
  skills: [],
  addingSkill: false,
  submitLoader: false,
  isModalVisible: false,
};

export const verifyUser = createAsyncThunk(
  '/users/:id', async ({
    firstName,
    lastName,
    selectedRole,
    selectedField,
    position,
    experience,
    education,
    about,
    plans,
    addingSkill,
    skills,
    id,
  }, { rejectWithValue }) => {
    try {
    const userData = await myAxios.put(`users/${id}`, {
      firstName,
      lastName,
      selectedRole,
      selectedField,
      position,
      experience,
      education,
      about,
      plans,
      addingSkill,
      skills,
    }, {headers: {
      Authorization: `Bearer ${getLocalStorage('accessToken')}` || '',
    }});
    return userData;
  }catch (err) {
    return rejectWithValue(err);
  }
  },
);

export const fillMyProfileSlice = createSlice({
  name: 'fillMyProfile',
  initialState,
  reducers: {
    setProfileState: (state, { payload }) => {
      return {
      ...state,
      ...payload
      }
    },
  },
  extraReducers: {
    [verifyUser.pending]: (state) => {
        state.submitLoader = true;
    },
    [verifyUser.fulfilled]: (state, {payload}) => {
        state.submitLoader = false;
        state = {...state, ...payload.data.data};
    },
    [verifyUser.rejected]: (state) => {
        state.isModalVisible = true;
        state.submitLoader = false;
    }
}
});

export const {
  setProfileState,
} = fillMyProfileSlice.actions;

export default fillMyProfileSlice.reducer;