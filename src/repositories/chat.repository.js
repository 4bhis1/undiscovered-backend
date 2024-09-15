const { Chat } = require('../models');

const saveChat = async (user, message, itinerayId, bot) => {
  const chat = new Chat({
    user,
    message,
    bot,
    itinerary: itinerayId,
  });
  return chat.save();
};

const getChats = async (itineraryId) => {
  return Chat.find({ itinerary: itineraryId });
};

module.exports = {
  saveChat,
  getChats,
};
