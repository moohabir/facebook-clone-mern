const express = require('express');
const router = express.Router();
const {
  getPosts,
  CreatePost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, CreatePost);
router.route('/:id').delete(protect, deletePost).put(protect, updatePost);

module.exports = router;
