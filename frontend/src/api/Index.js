import axios from "axios";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "";

export async function fetchTaskList() {
  const res = await axios.get(`${BASE_URL}/api/todo-app`);
  return res.data;
}
export async function addTask({ title, completed }) {
  const res = await axios.post(`${BASE_URL}/api/todo-app`, {
    title,
    completed,
  });
  return res.data;
}
export async function updateTask({ id, title, completed }) {
  const res = await axios.put(`${BASE_URL}/api/todo-app`, {
    id,
    title,
    completed,
  });
  return res.data;
}
export async function removeTask({ id }) {
  const res = await axios.delete(`${BASE_URL}/api/todo-app/${id}`);
  return res.data;
}
