'use client';

import { Header } from '@/components/header';
import { TaskFilters } from '@/components/task-filters';
import { TaskList } from '@/components/task-list';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTasks } from '@/hooks/useTasks';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
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

  if (!isLoaded || !isMounted) return null;
  if (isLoading) return <div>Loading...</div>;

  function handleAddTask(title: string) {
    createMutation.mutate({
      title,
      completed: false,
      userId: Number(user?.id),
    });
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="p-4 md:p-6">
        <Header onAddTask={handleAddTask} />
        
        {isSignedIn ? (
          <>
            <div className="mb-4 md:mb-6">
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
          </>
        ) : (
          <div className="text-center py-8 md:py-10">
            <h2 className="text-lg md:text-xl mb-2">Welcome to Task Dashboard</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Please sign in to manage your tasks
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
