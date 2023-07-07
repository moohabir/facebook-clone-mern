const mongoose = require('mongoose');

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

    comments: [
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
    ],

    // likes: {
    //type: Map,
    // of: Boolean,
    // },
    //comments: {
    //type: Array,
    // default: [],
    //},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('posts', postSchema);
