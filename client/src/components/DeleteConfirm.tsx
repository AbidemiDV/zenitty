import type { Task } from '../types';
import { useDeleteTask } from '../hooks/useTasks';

interface DeleteConfirmProps {
  task: Task;
  onClose: () => void;
}

export default function DeleteConfirm({ task, onClose }: DeleteConfirmProps) {
  const deleteTask = useDeleteTask();

  const handleDelete = () => {
    deleteTask.mutate(task.id, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-charcoal-800 rounded-sheet w-full max-w-sm p-6 shadow-sheet">
        <h2 className="text-lg font-bold text-forest-700 dark:text-mint-300 mb-2">
          Delete Task
        </h2>
        <p className="text-sm text-forest-500 dark:text-mint-500 mb-6">
          Are you sure you want to delete "{task.title}"? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 text-forest-600 dark:text-mint-400 font-semibold hover:bg-mint-50 dark:hover:bg-charcoal-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
