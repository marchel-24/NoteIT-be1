const Task = require("../models/task");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, deadline, description, image, status } = req.body;

    const task = new Task({
      title,
      deadline,
      description,
      image,
      status,
    });

    await task.save();
    res.status(201).json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, deadline, description, image, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, deadline, description, image, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
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


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  sortTaskbydateasc
};
