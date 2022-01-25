import { configureStore } from '@reduxjs/toolkit';

import fillMyProfileSlice from '../features/fillMyProfile/fillMyProfileSlice';
import profileSlice from '../features/profile/profile';

export default configureStore({
  reducer: {
    fillMyProfile: fillMyProfileSlice,
    profile: profileSlice
  },
});
