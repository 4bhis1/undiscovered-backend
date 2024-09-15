const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const chat = catchAsync(async (req, res) => {
  const { itineraryId } = req.params;
  const { message } = req.body;

  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  const response = await chatService.chatWithAi(itineraryId, message, req.user);
  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Response not found');
  }
  res.send(response);
});

module.exports = {
  chat,
};
