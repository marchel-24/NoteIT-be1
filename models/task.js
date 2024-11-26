const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "In-progress", "Completed"], // Status yang diizinkan
      default: "Pending",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
