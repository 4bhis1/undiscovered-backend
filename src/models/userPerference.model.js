const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const userPreferencesSchema = mongoose.Schema(
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
      required: true,
    },
    interests: {
      type: [String],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userPreferencesSchema.plugin(toJSON);
userPreferencesSchema.plugin(paginate);

userPreferencesSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef UserPreferences
 */
const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

module.exports = UserPreferences;
