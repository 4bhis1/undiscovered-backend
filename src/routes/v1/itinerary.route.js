const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const itineraryValidation = require('../../validations/itinirary.validation');
const itineraryController = require('../../controllers/itinerary.controller');
const aggregateRequestDataMiddleware = require('../../middlewares/requestParameterHandler');

const router = express.Router();

router
  .route('/generate')
  .post(
    auth('generateItinerary'),
    aggregateRequestDataMiddleware,
    validate(itineraryValidation.generateItinerary),
    itineraryController.generate
  );

router
  .route('/image')
  .get(auth('locationImage'), validate(itineraryValidation.locationImage), itineraryController.locationImage);

module.exports = router;
