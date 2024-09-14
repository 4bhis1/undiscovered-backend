const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const itineraryItemSchema = mongoose.Schema(
  {
    itinerary_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Itinerary',
      required: true,
    },
    day: {
      type: String,
    },
    date: {
      type: String,
    },
    day_no: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
itineraryItemSchema.plugin(toJSON);
itineraryItemSchema.plugin(paginate);

itineraryItemSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef ItineraryItem
 */

const ItineraryItem = mongoose.model('ItineraryItem', itineraryItemSchema);
module.exports = ItineraryItem;
