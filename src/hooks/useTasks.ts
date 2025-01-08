import { useToast } from '@/hooks/use-toast';
import { createTask, deleteTask, fetchTasks, updateTask } from '@/lib/api';
import { useTaskStore } from '@/lib/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useTasks = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { tasks, filter, setTasks, setFilter } = useTaskStore();
  const { toast } = useToast();

  const { data: apiTasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: isMounted && tasks.length === 0,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      setTasks([...tasks, newTask]);
      toast({ title: 'Task created successfully' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      toast({ title: 'Task updated successfully' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, deletedId) => {
      setTasks(tasks.filter(t => t.id !== deletedId));
      toast({ title: 'Task deleted successfully' });
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (apiTasks && tasks.length === 0) {
      setTasks(apiTasks);
    }
  }, [apiTasks, setTasks, tasks.length]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedPercentage = tasks.length > 0
    ? (tasks.filter((t) => t.completed).length / tasks.length) * 100
    : 0;

  return {
    isMounted,
    isLoading,
    filteredTasks,
    completedPercentage,
    createMutation,
    updateMutation,
    deleteMutation,
    setFilter,
    filter,
  };
};
