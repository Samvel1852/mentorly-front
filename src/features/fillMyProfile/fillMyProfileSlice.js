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
};

export const verifyUser = createAsyncThunk(
  '/users/:id',
  ({
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
  }) => {
    return myAxios.put(`users/${id}`, {
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
    setPosition: (state, { payload }) => {
      state.position = payload;
    },
  },
});

export const {
  setProfileState,
} = fillMyProfileSlice.actions;

export default fillMyProfileSlice.reducer;