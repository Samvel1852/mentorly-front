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

export const finish = createAsyncThunk(
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
      Authorization: getLocalStorage('accessToken') || '',
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
    setSkills: (state, { payload }) => {
      state.skills = payload;
    },
    setAddingSkill: (state, { payload }) => {
      state.addingSkill = payload;
    },
  },
});

export const {
  setProfileState,
  setRole,
  setField,
  setAddingSkill,
  setSkills,
} = fillMyProfileSlice.actions;

export default fillMyProfileSlice.reducer;