import React, { useEffect } from "react";
import { addTask, updateTask } from "../api/Index";

export default function Form({
  input,
  setInput,
  tasks,
  setTasks,
  editTask,
  setEditTask,
}) {
  const updateExistingTask = async (event) => {
    event.preventDefault();
    const res = await updateTask({
      id: editTask._id,
      title: input,
      completed: false,
    });
    setTasks(res.taskList);
    setEditTask("");
  };

  useEffect(() => {
    if (editTask) {
      setInput(editTask.title);
    } else {
      setInput("");
    }
  }, [setInput, editTask]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const addNewTask = async (event) => {
    event.preventDefault();
    const res = await addTask({ title: input, completed: false });
    setTasks(res.taskList);
    setInput("");
  };
  return (
    <form onSubmit={editTask ? updateExistingTask : addNewTask}>
      <input
        type="text"
        placeholder="Enter a Task"
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTask ? "OK" : "Add"}
      </button>
    </form>
  );
}
