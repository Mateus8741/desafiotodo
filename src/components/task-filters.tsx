import { Button } from "@/components/ui/button";
import { TaskFilter } from "@/lib/types";

type TaskFiltersProps = {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
};

export function TaskFilters({
  currentFilter,
  onFilterChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("all")}
        className="text-sm"
      >
        All
      </Button>
      <Button
        variant={currentFilter === "pending" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("pending")}
        className="text-sm"
      >
        Pending
      </Button>
      <Button
        variant={currentFilter === "completed" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("completed")}
        className="text-sm"
      >
        Completed
      </Button>
    </div>
  );
}
