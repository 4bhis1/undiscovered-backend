const axios = require('axios');
const chatRepository = require('../repositories/chat.repository');
const itineraryRepository = require('../repositories/itinerary.repository');

const generateMessage = (chats, short_desc) => {
  let messages = [
    {
      role: 'system',
      content: `You are an itinerary planner bot. Our short_desc of itinerary is: ${short_desc}`,
    },
  ];

  for (let chat of chats) {
    let { bot, message } = chat || {};

    if (bot) {
      messages.push({
        role: 'assistant',
        content: message,
      });
    } else {
      messages.push({
        role: 'user',
        content: message,
      });
    }
  }

  return messages;
};
const chatWithAi = async (itineraryId, message, user) => {
  const itinerary = await itineraryRepository.findItineraryById(itineraryId);

  await chatRepository.saveChat(user, message, itineraryId, false);

  const chats = await chatRepository.getChats(itineraryId);

  let messages = generateMessage(chats, itinerary?.short_desc);

  const { data } = await axios.post(process.env.UNDISCOVERED_AI_CHAT_ENDPOINT, {
    messages,
  });

  if (data?.response) {
    await chatRepository.saveChat(user, data?.response, itineraryId, true);
  }

  return data?.response;
};

module.exports = {
  chatWithAi,
};
