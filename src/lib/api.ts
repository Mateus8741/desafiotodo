import axios from 'axios';
import { Task } from './types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/todos');
  return data.slice(0, 10).map((task: any) => ({
    ...task,
    createdAt: new Date().toISOString()
  }));
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const { data } = await api.post('/todos', task);
  return {
    ...data,
    createdAt: new Date().toISOString()
  };
};

export const updateTask = async (task: Task): Promise<Task> => {
  const { data } = await api.put(`/todos/${task.id}`, task);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
}; 