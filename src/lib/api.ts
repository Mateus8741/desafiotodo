import axios from 'axios';
import { Task } from './types';
import { generateUniqueId } from './utils';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export async function fetchTasks(): Promise<Task[]> {
  const { data } = await api.get('/todos');
  return data.slice(0, 10).map((task: Task) => ({
    ...task,
    createdAt: new Date().toISOString()
  }));
};


export async function createTask(task: Partial<Task>): Promise<Task> {
  const { data } = await api.post('/todos', task);
  return {
    ...data,
    id: generateUniqueId(),
    createdAt: new Date().toISOString()
  };
};

export async function updateTask(task: Task): Promise<Task> {
  const { data } = await api.put(`/todos/${task.id}`, task);
  return data;
};

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/todos/${id}`);
};