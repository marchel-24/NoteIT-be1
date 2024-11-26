const Task = require("../models/task");
const mongoose = require("mongoose");

// Create a new task
const createTask = async (req, res, next) => {
  const { title, deadline, description, image, status } = req.body;
  const userId = req.user._id.toString();

  // Validasi input
  if (!title || !deadline) {
    return next(new Error("Title and deadline are required"));
  }

  try {
    // Buat task baru
    const task = new Task({
      title,
      deadline,
      description,
      image,
      status,
      userId,
    });
    await task.save();

    // Respons sukses
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error); // Teruskan error ke middleware berikutnya
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const { id, title } = req.query;

    // Build the query object to include either _id or title (or both)
    const query = {};
    if (id) query._id = id;
    if (title) query.title = { $regex: title, $options: "i" };
    query.userId = req.user._id.toString();

    console.log(query);

    const tasks = await Task.find(query);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTaskById = async (req, res, next) => {
  const { id } = req.params;

  // Validasi apakah ID valid
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  try {
    // Cari task berdasarkan ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    // Teruskan error ke middleware errorHandler
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, deadline, description, image, status } = req.body;

  // Validasi apakah ID valid
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  try {
    // Mencari dan memperbarui task berdasarkan ID
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, deadline, description, image, status },
      { new: true, runValidators: true }
    );

    // Jika task tidak ditemukan, beri respons 404
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Respons sukses
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    // Teruskan error ke middleware errorHandler
    next(error);
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all tasks, sorted by the closest deadline
const sortTaskbydateasc = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 }); // Sort by deadline in ascending order
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const sortTaskByDateDesc = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: -1 }); // Sort by deadline in descending order
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  sortTaskbydateasc,
  sortTaskByDateDesc,
};
