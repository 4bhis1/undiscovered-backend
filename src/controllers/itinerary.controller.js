const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const itineraryService = require('../services/itinerary.service');

const generate = catchAsync(async (req, res) => {
  const generateItineraryDto = req.body;
  console.log('user', req.user);
  const response = await itineraryService.generateItinerary(generateItineraryDto);
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Response not found');
  }
  res.send(response);
});

module.exports = {
  generate,
};
