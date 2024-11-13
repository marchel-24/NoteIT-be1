const Note = require("../models/note");

const sendNotes = (req, res) => {
  res.status(200).send("Notes");
};

const getNotes = async (req, res) => {
  const notes = Note.find();
  res.status(200).json(notes);
};

module.exports = {
  sendNotes,
  getNotes,
};
