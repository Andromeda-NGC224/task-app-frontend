import axios from "axios";
import { Task } from "../types/types";

const API_URL = "https://task-app-backend-ap4y.onrender.com";

export const taskService = {
  async getTasks(searchQuery = "", status = ""): Promise<Task[]> {
    const response = await axios.get(`${API_URL}/tasks`, {
      params: {
        search: searchQuery,
        status,
      },
    });
    return response.data;
  },

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await axios.delete(`${API_URL}/tasks/${id}`);
  },
};

export default taskService;
