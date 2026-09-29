import { useTasks } from '../hooks/useTasks';
import type { TaskQueryParams, TaskStatus } from '../types';
import TaskItem from './TaskItem';
import { useState } from 'react';
import type { Task } from '../types';
import { Filter, ChevronDown } from 'lucide-react';

interface TaskListProps {
  params?: TaskQueryParams;
  dateFilter?: { dueToday?: boolean; overdue?: boolean };
  selectedTaskId?: string | null;
  onSelectTask?: (task: Task) => void;
}

const statusChips: { value: TaskStatus | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'TODO', label: 'To do' },
  { value: 'IN_PROGRESS', label: 'In progress' },
  { value: 'COMPLETED', label: 'Completed' },
];

export default function TaskList({ params, dateFilter, selectedTaskId, onSelectTask }: TaskListProps) {
  const { data: tasks, isLoading, error } = useTasks(params);
  const [activeChip, setActiveChip] = useState<TaskStatus | ''>('');

  const filteredTasks = tasks?.filter((task) => {
    if (activeChip && task.status !== activeChip) return false;
    if (!dateFilter) return true;
    if (dateFilter.dueToday) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      return due >= today && due < tomorrow && task.status !== 'COMPLETED';
    }
    if (dateFilter.overdue) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      return due < today && task.status !== 'COMPLETED';
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-charcoal-800 rounded-card p-8 shadow-card">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-charcoal-800 rounded-card p-8 shadow-card">
        <div className="text-center py-12">
          <p className="text-danger">Failed to load tasks</p>
        </div>
      </div>
    );
  }

  if (!filteredTasks || filteredTasks.length === 0) {
    return (
      <div className="bg-white dark:bg-charcoal-800 rounded-card p-8 shadow-card">
        <div className="text-center py-12">
          <p className="text-forest-400 dark:text-mint-600">No tasks found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-mint-100 dark:border-charcoal-700">
        <h3 className="text-base font-extrabold text-forest-700 dark:text-mint-300">
          Today's tasks
        </h3>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1">
            {statusChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setActiveChip(chip.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeChip === chip.value
                    ? 'bg-forest-600 text-white'
                    : 'bg-mint-50 dark:bg-charcoal-700 text-forest-500 dark:text-mint-500 hover:bg-mint-100'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-lg hover:bg-mint-50 dark:hover:bg-charcoal-700 transition-colors">
            <Filter className="w-4 h-4 text-forest-400" />
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-mint-50 dark:hover:bg-charcoal-700 transition-colors text-xs font-bold text-forest-500">
            Sort: Due date
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-mint-50 dark:divide-charcoal-700">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isSelected={selectedTaskId === task.id}
            onClick={() => onSelectTask?.(task)}
          />
        ))}
      </div>
    </div>
  );
}
