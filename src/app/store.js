import { configureStore } from '@reduxjs/toolkit';

import fillMyProfileSlice from '../features/fillMyProfile/fillMyProfileSlice';

export default configureStore({
  reducer: {
    fillMyProfile: fillMyProfileSlice,
  },
});
