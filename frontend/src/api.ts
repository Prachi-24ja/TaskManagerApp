import axios from "axios";

const API_URL = "https://localhost:5001/api/tasks";

export const getTasks = () => axios.get(API_URL);
export const addTask = (description: string) =>
  axios.post(API_URL, { description, isCompleted: false });
export const toggleTask = (id: number) => axios.put(`${API_URL}/${id}/toggle`);
export const deleteTask = (id: number) => axios.delete(`${API_URL}/${id}`);