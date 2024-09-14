const ItineraryItem = require('../models/itineraryItem.model');

const saveItineraryItem = async (ItineraryItemData) => {
  const itineraryItem = new ItineraryItem(ItineraryItemData);
  return await itineraryItem.save(); // Save to the database
};

// You can add more repository functions here
const findItineraryItemById = async (id) => {
  return await ItineraryItem.findById(id);
};

const updateItineraryItem = async (id, ItineraryItemData) => {
  return await ItineraryItem.findByIdAndUpdate(id, ItineraryItemData, { new: true });
};

const deleteItineraryItem = async (id) => {
  return await ItineraryItem.findByIdAndDelete(id);
};

module.exports = {
  saveItineraryItem,
  findItineraryItemById,
  updateItineraryItem,
  deleteItineraryItem,
};