import { configureStore } from '@reduxjs/toolkit';

import fillMyProfileSlice from '../features/fillMyProfile/fillMyProfileSlice';
import userSlice from '../features/Dashboard/dashboardSlice';

export default configureStore({
  reducer: {
    fillMyProfile: fillMyProfileSlice,
    users: userSlice
  },
});
