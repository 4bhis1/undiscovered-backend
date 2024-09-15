const Joi = require('joi');

const generateItinerary = {
  body: Joi.object().keys({
    destination: Joi.string().required(),
    budget: Joi.string().optional(),
    interests: Joi.array().items(Joi.string()).required(),
    checkinDate: Joi.string().required(),
    checkoutDate: Joi.string().required(),
    members: Joi.object()
      .keys({
        adults: Joi.string().required(),
        kids: Joi.string().required(),
      })
      .required(),
  }),
};

const regenerateItineraryProgram = {
  params: Joi.object().keys({
    programId: Joi.string().required(),
  }),
};

const removeItineraryProgram = {
  query: Joi.object().keys({
    programId: Joi.string().required(),
  }),
};

const locationImage = {
  query: Joi.object().keys({
    location: Joi.string().required(),
  }),
};

const getItinerary = {
  params: Joi.object().keys({
    itineraryId: Joi.string().required(),
  }),
};

const getUsersItineraries = {};

module.exports = {
  generateItinerary,
  locationImage,
  regenerateItineraryProgram,
  removeItineraryProgram,
  getItinerary,
  getUsersItineraries,
};
