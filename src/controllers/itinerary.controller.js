const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const itineraryService = require('../services/itinerary.service');

const generate = catchAsync(async (req, res) => {
  const generateItineraryDto = req.body;
  const response = await itineraryService.generateItinerary(generateItineraryDto, req.user);
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Response not found');
  }
  res.send(response);
});

const regenerateItineraryProgram = catchAsync(async (req, res) => {
  const { programId = null } = req.params;
  const { suggestion } = req.body;
  const response = await itineraryService.regenerateItineraryProgram(programId, suggestion);
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Response not found');
  }
  res.send(response);
});

const removeItineraryProgram = catchAsync(async (req, res) => {
  const { programId = null } = req.body;
  const response = await itineraryService.removeItineraryProgram(programId);
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Response not found');
  }
  res.send(response);
});

const locationImage = catchAsync(async (req, res) => {
  const { location } = req.query;
  console.log('🚀 ~ locationImage ~ location:', location);
  const response = await itineraryService.fetchLocationImage(location);
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Response not found');
  }
  res.send(response);
});

module.exports = {
  generate,
  locationImage,
  regenerateItineraryProgram,
  removeItineraryProgram,
};
