import { Button } from '@/components/ui/button';
import { TaskFilter } from '@/lib/types';

type TaskFiltersProps = {
    currentFilter: TaskFilter;
    onFilterChange: (filter: TaskFilter) => void;
  };

const filters = ['all', 'pending', 'completed'] as const;

export function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="flex gap-2 mb-4">
      {filters.map((f) => (
        <Button
          key={f}
          variant={currentFilter === f ? 'default' : 'outline'}
          onClick={() => onFilterChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </Button>
      ))}
    </div>
  );
};
