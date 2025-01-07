'use client';

import { TaskDialog } from '@/components/task-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

import { createTask, deleteTask, fetchTasks, updateTask } from '@/lib/api';
import { useTaskStore } from '@/lib/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { tasks, filter, setTasks, setFilter, toggleTheme } = useTaskStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: apiTasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: isMounted,
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedPercentage = tasks.length > 0 
    ? (tasks.filter((t) => t.completed).length / tasks.length) * 100
    : 0;

  if (!isMounted) return null;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        {/* Resto do JSX permanece igual */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Task Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggleTheme}>
              Toggle Theme
            </Button>
            <TaskDialog
              onSave={(title) =>
                createMutation.mutate({
                  title,
                  completed: false,
                  userId: 1,
                })
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <Progress value={completedPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(completedPercentage)}% tasks completed
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={(checked) =>
                    updateMutation.mutate({
                      ...task,
                      completed: checked as boolean,
                    })
                  }
                />
                <span className={task.completed ? "line-through" : ""}>
                  {task.title}
                </span>
              </div>
              <div className="flex gap-2">
                <TaskDialog
                  task={task}
                  onSave={(title) =>
                    updateMutation.mutate({
                      ...task,
                      title,
                    })
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(task.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 