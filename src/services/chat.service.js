const axios = require('axios');
const chatRepository = require('../repositories/chat.repository');
const itineraryRepository = require('../repositories/itinerary.repository');

const generateMessage = (chats, short_desc) => {
  const shortDescPrompt = `Our short_desc of itinerary is: ${short_desc}`;

  const prompt = short_desc ? `You are an itinerary planner bot. ${shortDescPrompt}` : `You are an itinerary planner bot.`;
  let messages = [
    {
      role: 'system',
      content: prompt,
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

  const chats = await chatRepository.getChats(itineraryId, user);

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
