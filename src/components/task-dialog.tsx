import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Task } from "@/lib/types";
import { useState } from "react";

interface TaskDialogProps {
  task?: Task;
  onSave: (title: string) => void;
}

export function TaskDialog({ task, onSave }: TaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task?.title || "");

  const handleSave = () => {
    onSave(title);
    setOpen(false);
    setTitle("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={task ? "outline" : "default"}>
          {task ? "Edit" : "Add Task"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
          />
          <Button onClick={handleSave} disabled={!title.trim()}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
