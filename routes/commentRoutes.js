const express = require('express');
const router = express.Router();
const {
  getComments,
  CreateComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getComments).post(protect, CreateComment);
router.route('/:id').delete(protect, deleteComment).put(protect, updateComment);

module.exports = router;
