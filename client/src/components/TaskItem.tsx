import type { Task } from '../types';
import { useUpdateTask } from '../hooks/useTasks';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityColors: Record<string, string> = {
  HIGH: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  MEDIUM: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  LOW: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
};

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const updateTask = useUpdateTask();

  const toggleComplete = () => {
    const newStatus = task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    updateTask.mutate({ id: task.id, data: { status: newStatus } });
  };

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-card p-4 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-start gap-3">
        <button
          onClick={toggleComplete}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
            task.status === 'COMPLETED'
              ? 'bg-forest-600 border-forest-600'
              : 'border-mint-300 hover:border-forest-500'
          }`}
          aria-label={task.status === 'COMPLETED' ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.status === 'COMPLETED' && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold ${
              task.status === 'COMPLETED'
                ? 'line-through text-forest-400 dark:text-mint-600'
                : 'text-forest-700 dark:text-mint-300'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-forest-500 dark:text-mint-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-mint-100 text-forest-600 dark:bg-charcoal-700 dark:text-mint-400">
              {task.category}
            </span>
            {task.dueDate && (
              <span className="text-xs text-forest-400 dark:text-mint-600">
                Due {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg hover:bg-mint-100 dark:hover:bg-charcoal-700 transition-colors"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
