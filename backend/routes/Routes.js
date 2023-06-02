const express = require("express");
const {
  fetchTaskList,
  addTask,
  updateTask,
  removeTask,
} = require("./../controllers/TaskListController");

const router = express.Router();

router.get("/todo-app", fetchTaskList);
router.post("/todo-app", addTask);
router.put("/todo-app", updateTask);
router.delete("/todo-app/:id", removeTask);

module.exports = router;
