// routes/tasks.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Route to create a new task
router.post("/", authMiddleware, createTask);

// Route to get all tasks for the authenticated user
router.get("/", authMiddleware, getTasks);


// Route to delete a specific task
router.delete("/:id", authMiddleware, deleteTask);


module.exports = router;
