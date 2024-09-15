const Joi = require('joi');

const chatValidation = {

  body: Joi.object().keys({
    message: Joi.string().required(),
    itineraryId: Joi.string().optional(),
  }),
};

module.exports = {
  chatValidation,
};
