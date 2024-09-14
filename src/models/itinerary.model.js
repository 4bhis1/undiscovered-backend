const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const AccommodationCostSchema = mongoose.Schema(
  {
    hostelCostPerNight: Number,
    hotelCostPerNight: Number,
    luxuryHotelCostPerNight: Number,
    airbnbCostPerNight: Number,
  },
  { timestamps: true }
);

const TransportationCostSchema = mongoose.Schema(
  {
    busCost: Number,
    taxiCost: Number,
    trainCost: Number,
    rentalCost: Number,
  },
  { timestamps: true }
);

const FoodCostSchema = mongoose.Schema(
  {
    streetFoodCost: Number,
    budgetRestaurantCost: Number,
    fancyRestaurantCost: Number,
    traditionalFoodCost: Number,
  },
  { timestamps: true }
);

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
    interests: {
      type: [String],
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
    number_of_days: {
      type: Number,
    },
    destination_cities: {
      type: [String],
    },
    destination_country: {
      type: String,
    },
    currency: {
      type: String,
    },
    one_dollar_in_local_currency: {
      type: Number,
    },
    languages_spoken: {
      type: [String],
    },
    time_format: {
      type: String,
    },
    capital_of_country: {
      type: String,
    },
    local_weather: {
      type: String,
    },
    temparature_range: {
      type: String,
    },
    short_desc: {
      type: String,
    },
    short_history: {
      type: String,
    },
    accommodation_estimated_costs: AccommodationCostSchema,
    transportation_estimated_costs: TransportationCostSchema,
    food_estimated_costs: FoodCostSchema,
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
