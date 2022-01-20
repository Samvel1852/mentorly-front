import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {myAxios} from '../../helpers/axiosInstance';

const initialState = {
  firstName: '',
  lastName: '',
  selectedRole: '',
  selectedField: '',
  experience: '',
  education: '',
  about: '',
  plans: '',
  skillName: '',
  skills: [],
  addingSkill: false,
};

export const finish = createAsyncThunk(
  '/fill-my-profile',
  ({
    firstName,
    lastName,
    selectedRole,
    selectedField,
    experience,
    education,
    about,
    plans,
    addingSkill,
    skills,
  }) => {
    return myAxios.post('users/verify', {
      firstName,
      lastName,
      selectedRole,
      selectedField,
      experience,
      education,
      about,
      plans,
      addingSkill,
      skills,
    });
  },
);

export const fillMyProfileSlice = createSlice({
  name: 'fillMyProfile',
  initialState,
  reducers: {
    setFirstName: (state, { payload }) => {
      state.firstName = payload;
    },
    setLastName: (state, { payload }) => {
      state.lastName = payload;
    },
    setRole: (state, { payload }) => {
      state.selectedRole = payload;
    },
    setField: (state, { payload }) => {
      state.selectedField = payload;
    },
    setEducation: (state, { payload }) => {
      state.education = payload;
    },
    setExperience: (state, { payload }) => {
      state.experience = payload;
    },
    setAbout: (state, { payload }) => {
      state.about = payload;
    },
    setPlans: (state, { payload }) => {
      state.plans = payload;
    },
    setSkillName: (state, { payload }) => {
      state.skillName = payload;
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
  setFirstName,
  setLastName,
  setRole,
  setField,
  setEducation,
  setExperience,
  setPlans,
  setAbout,
  setAddingSkill,
  setSkills,
  setSkillName,
} = fillMyProfileSlice.actions;

export default fillMyProfileSlice.reducer;
