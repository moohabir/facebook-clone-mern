import axios from 'axios';

const API_URL = 'http://localhost:9000/api/stories/';

// Create new post
const createStory = async (storyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, storyData, config);

  return response.data;
};

// Get user posts
const getStories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user post
const deleteStory = async (storyIdId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + storyIdId, config);

  return response.data;
};

const postService = {
  createStory,
  getStories,
  deleteStory,
};

export default postService;
