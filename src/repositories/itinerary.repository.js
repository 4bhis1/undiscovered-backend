const Itinerary = require('../models/itinerary.model');
const mongoose = require('mongoose');

const saveItinerary = async (itineraryData) => {
  const itinerary = new Itinerary(itineraryData);
  return await itinerary.save(); // Save to the database
};

// You can add more repository functions here
const findItineraryById = async (id) => {
  return await Itinerary.findById(id);
};

const updateItinerary = async (id, itineraryData) => {
  return await Itinerary.findByIdAndUpdate(id, itineraryData, { new: true });
};

const deleteItinerary = async (id) => {
  return await Itinerary.findByIdAndDelete(id);
};

const getItineraryWithDetails = async (itineraryId) => {
  return Itinerary.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(itineraryId) },
    },
    {
      $lookup: {
        from: 'itineraryitems',
        localField: '_id',
        foreignField: 'itinerary_id',
        as: 'itinerary',
      },
    },
    {
      $unwind: '$itinerary',
    },
    {
      $lookup: {
        from: 'programs',
        localField: 'itinerary._id',
        foreignField: 'itinerary_item_id',
        as: 'itinerary.program',
      },
    },
    {
      $project: {
        destination: {
          number_of_days: '$number_of_days',
          destination_cities: '$destination_cities',
          destination_country: '$destination_country',
          currency: '$currency',
          budget: '$budget',
          one_dollar_in_local_currency: '$one_dollar_in_local_currency',
          languages_spoken: '$languages_spoken',
          time_format: '$time_format',
          capital_of_country: '$capital_of_country',
          local_weather: '$local_weather',
          temparature_range: '$temparature_range',
          short_desc: '$short_desc',
          short_history: '$short_history',
          start_date: '$start_date',
          end_date: '$end_date',
          transportation_estimated_costs: '$transportation_estimated_costs',
          accommodation_estimated_costs: '$accommodation_estimated_costs',
          food_estimated_costs: '$food_estimated_costs',
        },
        itinerary: {
          day_no: '$itinerary.day_no',
          date: '$itinerary.date',
          program: {
            $map: {
              input: '$itinerary.program',
              as: 'prog',
              in: {
                _id: '$$prog._id',
                place: '$$prog.place',
                estimated_time: '$$prog.estimated_time',
                location: '$$prog.location',
                coordinate: '$$prog.coordinate',
                description: '$$prog.description',
                cost: '$$prog.cost',
                type: '$$prog.type',
              },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        destination: { $first: '$destination' },
        itinerary: { $push: '$itinerary' },
      },
    },
  ]);
};

const getItineraries = (userId) => {
  return Itinerary.find({ user_id: userId });
};

module.exports = {
  saveItinerary,
  findItineraryById,
  updateItinerary,
  deleteItinerary,
  getItineraryWithDetails,
  getItineraries,
};
