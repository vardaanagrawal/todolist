const mongoose = require("mongoose");

const taskList = mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
});

const ListModel = mongoose.model("TaskList", taskList);

module.exports = { ListModel };
