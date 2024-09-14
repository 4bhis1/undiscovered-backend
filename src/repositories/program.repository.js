const Program = require('../models/pogram.model');
const ItineraryItem = require('../models/itineraryItem.model');

const saveProgram = async (programData) => {
  const program = new Program(programData);
  return await program.save(); // Save to the database
};

// You can add more repository functions here
const findProgramById = async (id) => {
  return await Program.findById(id);
};

const updateProgram = async (id, programData) => {
  return await Program.findByIdAndUpdate(id, programData, { new: true });
};

const deleteProgram = async (id) => {
  return await Program.findByIdAndDelete(id);
};

const findProgramAndPopulate = async (id) => {
  return await Program.findById(id)
    .populate({
      path: 'itinerary_item_id',
      populate: {
        path: 'itinerary_id',
      },
    })
    .lean()
    .exec();
};

const findProgramsByItineraryId = async (itineraryId) => {
  const itineraryItems = await ItineraryItem.find({ itinerary_id: itineraryId });

  const itineraryItemIds = itineraryItems.map((item) => item._id);

  const programs = await Program.find({ itinerary_item_id: { $in: itineraryItemIds } });

  return programs;
};
module.exports = {
  saveProgram,
  findProgramById,
  updateProgram,
  deleteProgram,
  findProgramAndPopulate,
  findProgramsByItineraryId,
};
