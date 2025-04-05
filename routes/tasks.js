const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Get task by ID
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

// Create a new task
router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

// Update a task
router.put("/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete a task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
