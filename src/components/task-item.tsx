import { TaskDialog } from '@/components/task-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/lib/types';

type TaskItemProps = {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
};

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={task.completed}
          onCheckedChange={(checked) =>
            onUpdate({ ...task, completed: checked as boolean })
          }
        />
        <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
      </div>
      <div className="flex gap-2">
        <TaskDialog
          task={task}
          onSave={(title) => onUpdate({ ...task, title })}
        />
        <Button variant="destructive" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
