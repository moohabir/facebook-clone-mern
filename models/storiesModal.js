const mongoose = require('mongoose');

const storiesSchema = mongoose.Schema(
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
    category: { type: String },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('stories', storiesSchema);
