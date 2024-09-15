const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const aggregateRequestDataMiddleware = require('../../middlewares/requestParameterHandler');
const chatValidation = require('../../validations/chat.validation');
const { chatController } = require('../../controllers');

const router = express.Router();

router
  .route('/ask-chatbot')
  .post(
    auth('generateItinerary'),
    aggregateRequestDataMiddleware,
    validate(chatValidation.chatValidation),
    chatController.chat
  );

module.exports = router;
