const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
  {
    itinerary: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Itinerary',
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    bot: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
