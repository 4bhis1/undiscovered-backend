const Joi = require('joi');

const chatValidation = {
  params: Joi.object().keys({
    itineraryId: Joi.string().optional(),
  }),
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};

module.exports = {
  chatValidation,
};
