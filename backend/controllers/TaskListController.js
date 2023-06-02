const { ListModel } = require("./../models/TaskList");

async function fetchTaskList(req, res) {
  const taskList = await ListModel.find({});
  res.send({ taskList });
}
async function addTask(req, res) {
  const { title, completed } = req.body;
  const task = new ListModel({ title, completed });
  await task.save();
  const taskList = await ListModel.find({});
  res.send({ taskList });
}
async function updateTask(req, res) {
  const { id, title, completed } = req.body;
  await ListModel.findOneAndUpdate(
    { _id: id },
    { title: title, completed: completed }
  );
  const taskList = await ListModel.find({});
  res.send({ taskList });
}
async function removeTask(req, res) {
  const { id } = req.params;
  await ListModel.findByIdAndDelete({ _id: id });
  const taskList = await ListModel.find({});
  res.send({ taskList });
}

module.exports = {
  fetchTaskList,
  addTask,
  updateTask,
  removeTask,
};
