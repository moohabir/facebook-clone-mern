const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('comments', commentSchema);
