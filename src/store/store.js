import { configureStore } from '@reduxjs/toolkit';

import fillMyProfileSlice from '../features/fillMyProfile/fillMyProfileSlice';
import profileSlice from '../features/profile/profile';
import userSlice from '../features/Dashboard/dashboard';

export default configureStore({
  reducer: {
    fillMyProfile: fillMyProfileSlice,
    profile: profileSlice,
    users: userSlice
  },
});
