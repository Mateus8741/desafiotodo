import { TaskDialog } from '@/components/task-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/lib/types';
import { motion } from 'framer-motion';

type TaskItemProps = {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
};

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-4 border rounded-lg"
    >
      <div className="flex items-center gap-2">
        <Checkbox
          checked={task.completed}
          onCheckedChange={(checked) =>
            onUpdate({ ...task, completed: checked as boolean })
          }
        />
        <motion.span
          animate={{
            scale: task.completed ? 0.95 : 1,
            opacity: task.completed ? 0.5 : 1,
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
          transition={{ duration: 0.2 }}
        >
          {task.title}
        </motion.span>
      </div>
      <div className="flex gap-2">
        <TaskDialog
          task={task}
          onSave={(title) => onUpdate({ ...task, title })}
        />
        <Button 
          variant="destructive" 
          onClick={() => onDelete(task.id)}
          className="transition-all hover:scale-105"
        >
          Delete
        </Button>
      </div>
    </motion.div>
  );
}
