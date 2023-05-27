const express = require('express');
const router = express.Router();
const {
  getStories,
  CreateStory,
  updateStory,
  deleteStory,
} = require('../controllers/storiesController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getStories).post(protect, CreateStory);
router.route('/:id').delete(protect, deleteStory).put(protect, updateStory);

module.exports = router;
