const Note = require("../models/note");

const sendNotes = (req, res) => {
  res.status(200).send("Notes");
};

const getNotes = async (req, res) => {
  const { id, title } = req.query;

  // Build the query object to include either _id or title (or both)
  const query = {};
  if (id) query._id = id;
  if (title) query.title = { $regex: title, $options: "i" }; // Case-insensitive search on title
  query.userId = req.user._id.toString();

  const notes = await Note.find(query);
  res.status(200).json(notes);
};

const createNote = async (req, res, next) => {
  const { title, payload, image } = req.body;
  const userId = req.user._id.toString();

  if (!title) {
    // Panggil next dengan error
    return next(new Error("Title is required"));
  }

  try {
    const note = new Note({
      title,
      payload,
      image,
      userId,
    });

    await note.save();
    res
      .status(201)
      .json({ success: true, message: "Note created successfully", note });
  } catch (error) {
    // Pass error to middleware
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, payload, image } = req.body;

    // Validasi jika ID tidak diberikan
    if (!id) {
      return next(new Error("ID is required"));
    }

    // Validasi jika title kosong
    if (!title) {
      return next(new Error("Title is required"));
    }

    // Cek apakah ID valid
    const noteExists = await Note.findById(id);
    if (!noteExists) {
      return next(new Error("Note with the given ID was not found"));
    }

    // Update Note
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, payload, image },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    next(error); // Pass error ke middleware
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendNotes,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
