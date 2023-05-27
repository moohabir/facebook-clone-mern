import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storiesService from './storiesService';

const initialState = {
  stores: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new post
export const createStory = createAsyncThunk(
  'stories/create',
  async (storyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await storiesService.CreateStory(storyData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user stories
export const getStories = createAsyncThunk(
  'stories/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await storiesService.getStories(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user story
export const deleteStory = createAsyncThunk(
  'stories/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await storiesService.deleteStory(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stores.push(action.payload);
      })
      .addCase(createStory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stores = action.payload;
      })
      .addCase(getStories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stores = state.stores.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
