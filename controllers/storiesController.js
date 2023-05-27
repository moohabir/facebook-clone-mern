const asyncHandler = require('express-async-handler');

const Stories = require('../models/storiesModal');
const User = require('../models/userModel');
const cloudinary = require('../utils/cloudinary');

// Get strories
//populate is used to show the name of the person posting the post but not only the loged in person
const getStories = asyncHandler(async (req, res) => {
  const stories = await Stories.find({}).populate('user', 'name');

  res.status(200).json(stories);
});

// Create story

const CreateStory = asyncHandler(async (req, res) => {
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
    const story = await Stories.create({
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

    // Populate user's name in the post schema
    const populatedStories = await Stories.findById(story._id).populate(
      'user',
      'name'
    );
    res.status(200).json(populatedStories);
  }
});

//  Update story

const updateStory = asyncHandler(async (req, res) => {
  const story = await Stories.findById(req.params.id);

  if (!story) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the post user
  if (story.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedStories = await Stories.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedStories);
});

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private
const deleteStory = asyncHandler(async (req, res) => {
  const story = await Stories.findById(req.params.id);

  if (!story) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (story.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await story.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getStories,
  CreateStory,
  updateStory,
  deleteStory,
};
