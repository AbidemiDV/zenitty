import type { Task } from '../types';
import { useUpdateTask } from '../hooks/useTasks';

interface TaskItemProps {
  task: Task;
  isSelected?: boolean;
  onClick?: () => void;
}

const priorityStyles: Record<string, string> = {
  HIGH: 'bg-peach-100 text-danger-dark dark:bg-peach-300/20 dark:text-peach-300',
  MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-300/20 dark:text-yellow-300',
  LOW: 'bg-sage-100 text-forest-600 dark:bg-sage-300/20 dark:text-sage-300',
};

const categoryDots: Record<string, string> = {
  Work: 'bg-forest-600',
  Personal: 'bg-lavender-300',
  Health: 'bg-peach-300',
  Shopping: 'bg-yellow-500',
  Other: 'bg-gray-400',
};

export default function TaskItem({ task, isSelected, onClick }: TaskItemProps) {
  const updateTask = useUpdateTask();

  const toggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    updateTask.mutate({ id: task.id, data: { status: newStatus } });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED';

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 md:px-5 py-4 cursor-pointer transition-colors ${
        isSelected
          ? 'bg-mint-50 dark:bg-charcoal-700 border-l-2 border-forest-600'
          : 'hover:bg-mint-50/50 dark:hover:bg-charcoal-700/50'
      }`}
    >
      <button
        onClick={toggleComplete}
        className="w-11 h-11 flex items-center justify-center flex-shrink-0"
        aria-label={task.status === 'COMPLETED' ? 'Mark incomplete' : 'Mark complete'}
      >
        <div
          className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors ${
            task.status === 'COMPLETED'
              ? 'bg-forest-600 border-forest-600'
              : 'border-forest-600 hover:border-forest-500'
          }`}
        >
          {task.status === 'COMPLETED' && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </button>

      <div className="flex-1 min-w-0">
        <h4
          className={`text-task-title ${
            task.status === 'COMPLETED'
              ? 'line-through text-forest-400 dark:text-mint-600'
              : 'text-forest-700 dark:text-mint-300'
          }`}
        >
          {task.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full ${categoryDots[task.category] || categoryDots.Other}`} />
          <span className={`text-meta ${isOverdue ? 'text-danger' : 'text-forest-400 dark:text-mint-600'}`}>
            {task.category} &middot; {isOverdue ? 'Overdue' : task.dueDate ? formatTime(task.dueDate) : 'No due date'}
          </span>
        </div>
      </div>

      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${priorityStyles[task.priority]}`}>
        {task.priority}
      </span>
    </div>
  );
}
