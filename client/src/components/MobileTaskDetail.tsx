import type { Task } from '../types';
import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { ArrowLeft, Pencil, Check } from 'lucide-react';

interface MobileTaskDetailProps {
  task: Task;
  onBack: () => void;
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

export default function MobileTaskDetail({ task, onBack }: MobileTaskDetailProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleToggleComplete = () => {
    const newStatus = task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    updateTask.mutate({ id: task.id, data: { status: newStatus } });
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id, { onSuccess: onBack });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-mint-100 dark:bg-charcoal-900">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-forest-600 flex items-center justify-center text-white"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-extrabold text-forest-700 dark:text-mint-300">
            Task detail
          </h1>
        </div>
        <button
          className="p-2.5 rounded-xl bg-white dark:bg-charcoal-800 shadow-card"
          aria-label="Edit task"
        >
          <Pencil className="w-4 h-4 text-forest-500" />
        </button>
      </div>

      <div className="px-4 pb-24 space-y-4">
        <div className="bg-mint-300 dark:bg-forest-600 rounded-card p-5">
          <p className="text-meta text-forest-600 dark:text-mint-200 mb-1">
            {task.category} &middot; Due {task.dueDate ? formatTime(task.dueDate) : 'today'}
          </p>
          <h2 className="text-xl font-extrabold text-forest-700 dark:text-white">
            {task.title}
          </h2>
          {task.description && (
            <p className="text-sm text-forest-600 dark:text-mint-200 mt-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-charcoal-800 rounded-card shadow-card divide-y divide-mint-50 dark:divide-charcoal-700">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-bold text-forest-600 dark:text-mint-400">Status</span>
            <select
              value={task.status}
              onChange={(e) => updateTask.mutate({ id: task.id, data: { status: e.target.value as Task['status'] } })}
              className="px-3 py-1.5 rounded-lg bg-mint-50 dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="TODO">To do</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-bold text-forest-600 dark:text-mint-400">Priority</span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-bold text-forest-600 dark:text-mint-400">Category</span>
            <span className="flex items-center gap-2 text-sm font-semibold text-forest-700 dark:text-mint-300">
              <span className={`w-2 h-2 rounded-full ${categoryDots[task.category] || categoryDots.Other}`} />
              {task.category}
            </span>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-bold text-forest-600 dark:text-mint-400">Due date</span>
            <span className="text-sm font-semibold text-forest-700 dark:text-mint-300">
              {task.dueDate ? `${formatDate(task.dueDate)}, ${formatTime(task.dueDate)}` : 'Not set'}
            </span>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-bold text-forest-600 dark:text-mint-400">Created</span>
            <span className="text-sm font-semibold text-forest-700 dark:text-mint-300">
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-mint-100 dark:bg-charcoal-900 space-y-3">
        <button
          onClick={handleToggleComplete}
          className="w-full py-4 rounded-button bg-forest-600 text-white text-sm font-bold hover:bg-forest-700 transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          {task.status === 'COMPLETED' ? 'Mark as incomplete' : 'Mark as complete'}
        </button>
        <button
          onClick={handleDelete}
          className="w-full py-4 rounded-button bg-red-50 dark:bg-red-900/20 text-danger text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          Delete task
        </button>
      </div>
    </div>
  );
}
