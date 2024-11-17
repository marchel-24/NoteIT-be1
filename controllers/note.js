const Note = require("../models/note");

const sendNotes = (req, res) => {
  res.status(200).send("Notes");
};

const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};
const createNote = async (req, res) => {
  try {
    const { title, payload, image } = req.body;

    const note = new Note({
      title,
      payload,
      image,
    });

    await note.save();
    res.status(201).json({ success: true, message: "Note created successfully", note });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, payload, image } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, payload, image },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendNotes,
  getNotes,
  createNote,
  updateNote,
  deleteNote
};
