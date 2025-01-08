import { Task } from '@/lib/types';
import { TaskItem } from './task-item';

type TaskListProps = {
  tasks: Task[];
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
};

export function TaskList ({ tasks, onUpdate, onDelete }: TaskListProps) {
  return tasks.length > 0 ? (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  ) : (
    <p className="text-muted-foreground text-center">No tasks found.</p>
  );
};
