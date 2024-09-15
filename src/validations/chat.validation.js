const Joi = require('joi');

const chatValidation = {
  params: Joi.object().keys({
    itineraryId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};

module.exports = {
  chatValidation,
};
