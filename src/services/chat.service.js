const { itineraryService } = require('.');
const chatRepository = require('../repositories/chat.repository');

const chatWithAi = async (itinerayId, message, user) => {
  const itinerary = itineraryService.getItinerary(itinerayId);

  await chatRepository.saveChat(user, message, itinerayId, false);

  
  
};

module.exports = {
  chatWithAi,
};
