const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel');
const User = require('../models/userModel');
const cloudinary = require('../utils/cloudinary');

// Get posts
//populate is used to show the name of the person posting the post but not only the loged in person
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate('user', 'name');

  res.status(200).json(posts);
});

// Create post

const CreatePost = asyncHandler(async (req, res) => {
  const { text, user, image } = req.body;
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
    const post = await Post.create({
      text,
      user,
      image: imageRes
        ? {
            url: imageRes.url,
            secure_url: imageRes.secure_url,
            // Add additional image details if needed
          }
        : undefined,
    });

    //halkaan hoose waa si nameka userka saxdaa loosoo helo populate method

    // Populate user's name in the post schema
    const populatedPost = await Post.findById(post._id).populate(
      'user',
      'name'
    );
    res.status(200).json(populatedPost);
  }
});

//  Update post

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

// Like or dislike a post
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check if the user has already liked the post
  const likedIndex = post.likes.findIndex(
    (like) => like.toString() === req.user?.id.toString()
  );

  if (likedIndex === -1) {
    // User has not liked the post, add their like
    post.likes.push(req.user?.id || null); // Add the user's ID if authenticated, or null if not
  } else {
    // User has already liked the post, remove their like
    post.likes.splice(likedIndex, 1);
  }

  const updatedPost = await post.save();

  res.status(200).json({ likes: updatedPost.likes });
});

module.exports = {
  getPosts,
  CreatePost,
  updatePost,
  deletePost,
  likePost,
};
