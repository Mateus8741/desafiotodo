import { useToast } from '@/hooks/use-toast';
import { createTask, deleteTask, fetchTasks, updateTask } from '@/lib/api';
import { useTaskStore } from '@/lib/store';
import { Task } from '@/lib/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useTasks = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { tasks, filter, setTasks, setFilter, updateTask: updateStoreTask } = useTaskStore();
  const { toast } = useToast();

  const { data: apiTasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: isMounted && tasks.length === 0,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      setTasks([...tasks, { ...newTask, isManual: true }]);
      toast({ title: 'Task created successfully' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (task: Task) => {
      if (task.isManual) {
        return task;
      }
      return updateTask(task);
    },
    onMutate: (updatedTask) => {
      updateStoreTask(updatedTask);
    },
    onError: () => {
      toast({ 
        title: 'Failed to update task',
        variant: "destructive"
      });
    },
    onSuccess: () => {
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
