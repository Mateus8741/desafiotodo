'use client';

import { TaskDialog } from '@/components/task-dialog';
import { TaskFilters } from '@/components/task-filters';
import { TaskList } from '@/components/task-list';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTasks } from '@/hooks/useTasks';

export default function Home() {
  const {
    isMounted,
    isLoading,
    filteredTasks,
    completedPercentage,
    createMutation,
    updateMutation,
    deleteMutation,
    setFilter,
    filter,
  } = useTasks();

  if (!isMounted) return null;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Task Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline">Toggle Theme</Button>
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

        <TaskFilters currentFilter={filter} onFilterChange={(f) => setFilter(f)} />
          
        <TaskList
          tasks={filteredTasks}
          onUpdate={(task) => updateMutation.mutate(task)}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      </Card>
    </div>
  );
}
