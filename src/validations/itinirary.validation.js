const Joi = require('joi');

const generateItinerary = {
  body: Joi().keys({
    destination: Joi.string().required(),
    budget: Joi.string().optional(),
    preferences: Joi.array().items(Joi.string()).required(),
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

module.exports = {
  generateItinerary,
};
