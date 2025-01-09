import { Task } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { TaskItem } from './task-item';

type TaskListProps = {
  tasks: Task[];
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
};

export function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return sortedTasks.length > 0 ? (
    <motion.div 
      className="space-y-2"
      layout
    >
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  ) : (
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-muted-foreground text-center"
    >
      No tasks found.
    </motion.p>
  );
}
