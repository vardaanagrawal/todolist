import React, { useEffect, useState } from "react";
import { fetchTaskList, removeTask, updateTask } from "../api/Index";

export default function TaskList({ tasks, setTasks, setEditTask }) {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetchTaskList();
    setTasks(res.taskList);
  }

  const handleComplete = async (task) => {
    const res = await updateTask({
      id: task._id,
      title: task.title,
      completed: !task.completed,
    });
    setTasks(res.taskList);
  };

  const handleDelete = async (task) => {
    const res = await removeTask({ id: task._id });
    setTasks(res.taskList);
  };

  return (
    <div>
      {tasks.map((task) => (
        <li key={task._id} className="list-item">
          <input
            type="text"
            value={task.title}
            className={task.completed ? "complete list" : "list"}
            onChange={(event) => event.preventDefault()}
          />
          <div>
            <button
              className="button-complete"
              onClick={() => handleComplete(task)}
            >
              <i className="fa fa-check-circle"></i>
            </button>
            <button className="button-edit" onClick={() => setEditTask(task)}>
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="button-delete"
              onClick={() => handleDelete(task)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}
