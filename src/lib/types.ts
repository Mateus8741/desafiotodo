export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: string;
}

export type TaskFilter = 'all' | 'pending' | 'completed';

export interface User {
  id: number;
  email: string;
  name: string;
} 