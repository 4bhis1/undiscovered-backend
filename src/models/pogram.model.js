const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const programSchema = mongoose.Schema(
  {
    itinerary_item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ItineraryItem',
      required: true,
    },
    cost: {
      type: Number,
    },
    place: {
      type: String,
    },
    estimated_time: {
      type: String,
    },
    location: {
      type: String,
    },
    coordinate: {
      type: [String],
    },
    type: {
      type: String,
      enum: ['flight', 'hotel', 'activity', 'dining'],
    },
    description: {
      type: String,
    },
    preferences: {
      type: Map,
      of: String,
    },
    status: {
      type: String,
      enum: ['draft', 'finalized'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
programSchema.plugin(toJSON);
programSchema.plugin(paginate);

programSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef itinerarySchema
 */

const Itinerary = mongoose.model('Program', programSchema);
module.exports = Itinerary;
