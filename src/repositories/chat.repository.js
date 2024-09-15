const { Chat } = require('../models');

const saveChat = async (user, message, itineraryId, bot) => {
  const chat = new Chat({
    user,
    message,
    bot,
    itinerary: itineraryId,
  });
  return chat.save();
};

const getChats = async (itineraryId) => {
  return Chat.find({ itinerary: itineraryId }).sort({ createdAt: 1 });
};

module.exports = {
  saveChat,
  getChats,
};
