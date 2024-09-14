const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const itineraryService = require('../services/itinerary.service');

const generate = catchAsync(async (req, res) => {
  const generateItineraryDto = req.body;
  console.log('user', req.user);
  const prompt = await itineraryService.generateItinerary(generateItineraryDto);
  if (!prompt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Prompt not found');
  }
  res.send(prompt);
});

module.exports = {
  generate,
};
