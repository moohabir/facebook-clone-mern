const express = require('express');
const router = express.Router();
const {
  getPosts,
  CreatePost,
  updatePost,
  deletePost,
  like,
  unlike,
  addComment,
  //uncomment,
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, CreatePost);
router.route('/:postId/like').post(like);
router.route('/:postId/unlike').post(unlike);
router.route('/:postId/comment').post(addComment);
//router.route('/uncomment').post(protect, uncomment);
router.route('/:id').delete(protect, deletePost).put(updatePost);

module.exports = router;
