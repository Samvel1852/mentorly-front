import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  firstName: '',
  lastName: '',
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
    experience,
    education,
    about,
    plans,
    addingSkill,
    skills,
  }) => {
    return axios.post('http://localhost:4000/fill-my-profile', {
      firstName,
      lastName,
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
  setEducation,
  setExperience,
  setPlans,
  setAbout,
  setAddingSkill,
  setSkills,
  setSkillName,
} = fillMyProfileSlice.actions;

export default fillMyProfileSlice.reducer;
