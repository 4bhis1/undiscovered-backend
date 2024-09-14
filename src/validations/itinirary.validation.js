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

const locationImage = {
  query: Joi.object().keys({
    location: Joi.string().required(),
  }),
};

module.exports = {
  generateItinerary,
  locationImage,
};
