import { createSlice } from '@reduxjs/toolkit';

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
