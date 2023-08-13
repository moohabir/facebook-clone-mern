const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    image: { type: Object },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema], // Embed the comments schema as an array
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('posts', postSchema);
