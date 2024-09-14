const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const itinerarySchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    preferences: {
      type: Map,
      of: String,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
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
itinerarySchema.plugin(toJSON);
itinerarySchema.plugin(paginate);

itinerarySchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef itinerarySchema
 */

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;
