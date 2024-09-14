const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const itineraryController = require('../../controllers/itinerary.controller');
const aggregateRequestDataMiddleware = require('../../middlewares/requestParameterHandler');

const router = express.Router();

router
  .route('/generate')
  .post(
    auth('generateItinerary'),
    aggregateRequestDataMiddleware,
    validate(userValidation.generateItinerary),
    itineraryController.generate
  );

module.exports = router;
