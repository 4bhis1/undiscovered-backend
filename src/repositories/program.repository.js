const Program = require('../models/pogram.model');

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

module.exports = {
  saveProgram,
  findProgramById,
  updateProgram,
  deleteProgram,
};
