import { configureStore } from '@reduxjs/toolkit';

import fillMyProfileSlice from '../features/fillMyProfile/fillMyProfileSlice';
import profileSlice from '../features/profile/profileSlice';
import userSlice from '../features/Dashboard/dashboardSlice';

export default configureStore({
  reducer: {
    fillMyProfile: fillMyProfileSlice,
    profile: profileSlice,
    users: userSlice
  },
});
