import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/posts/postSlice';
import storiesReducer from '../features/stories/storiesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    stores: storiesReducer,
  },
});
