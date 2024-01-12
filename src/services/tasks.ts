import axiosClient from "./axios";
import { tasksApiUrl } from "../config";

const getTasks = async () => await axiosClient.get(tasksApiUrl);

const createTask = async (body: any) => await axiosClient.post(tasksApiUrl, body);

const updateTask = async (body: any) => await axiosClient.put(tasksApiUrl, body);

const deleteTask = async (task: any) => await axiosClient.delete(tasksApiUrl, { data: task });

export {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}