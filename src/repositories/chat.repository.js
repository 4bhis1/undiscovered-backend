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

const getChats = async (itineraryId, user) => {
  let filter = { user };

  
  if (!itineraryId) {
    filter.itinerary = { $exists: false };
  } else {
    filter.itinerary = itineraryId;
  }


  return Chat.find(filter).sort({ createdAt: 1 });
};

module.exports = {
  saveChat,
  getChats,
};
