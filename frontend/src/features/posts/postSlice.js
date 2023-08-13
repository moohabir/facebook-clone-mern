import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
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

// Get user posts
export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getPosts(token);
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

// Delete user post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(id, token);
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

// Add comment
export const addCommentToPost = createAsyncThunk(
  'posts/addComment',
  async ({ postId, text, user }) => {
    try {
      const response = await axios.post(url + `${postId}/comment`, {
        text,
        user,
      });

      return response.data; // Return the updated post data with comments
    } catch (error) {
      throw error;
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState,
    addComment: (state, action) => {
      const { postId, text, user } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        const newComment = {
          postId, // You need to implement a function to generate unique IDs
          text,
          user,
        };

        const updatedPosts = [...state.posts];
        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],
          comments: [...updatedPosts[postIndex].comments, newComment],
        };

        state.posts = updatedPosts;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );

        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
