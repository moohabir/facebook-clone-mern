const asyncHandler = require('express-async-handler');

const Comment = require('../models/commentModal');
const User = require('../models/userModel');
const cloudinary = require('../utils/cloudinary');

// Get posts
//populate is used to show the name of the person posting the post but not only the loged in person
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({}).populate('user', 'name');

  res.status(200).json(comments);
});

// Create comment

const CreateComment = asyncHandler(async (req, res) => {
  const { text, user, image, category } = req.body;
  let imageRes;

  if (image) {
    imageRes = await cloudinary.uploader.upload(image, {
      upload_preset: 'facebookClone',
    });
  }

  if (!text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  if (imageRes) {
    const comment = await Comment.create({
      text,
      user,
      category,
      image: imageRes
        ? {
            url: imageRes.url,
            secure_url: imageRes.secure_url,
            // Add additional image details if needed
          }
        : undefined,
    });

    // Populate user's name in the comment schema
    const populatedComment = await Comment.findById(comment._id).populate(
      'user',
      'name'
    );
    res.status(200).json(populatedComment);
  }
});

//  Update comment

const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error('Comment not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the post user
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedComment = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedComment);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error('Comment not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await comment.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getComments,
  CreateComment,
  updateComment,
  deleteComment,
};
