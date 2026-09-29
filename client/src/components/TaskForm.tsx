import { useState } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../types';
import { useCreateTask, useUpdateTask } from '../hooks/useTasks';

interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
}

const categories = ['Work', 'Personal', 'Health', 'Shopping', 'Other'];

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'TODO');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'MEDIUM');
  const [category, setCategory] = useState(task?.category ?? 'Other');
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const data = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      category,
      dueDate: dueDate || undefined,
    };

    if (task) {
      updateTask.mutate(
        { id: task.id, data },
        { onSuccess: onClose }
      );
    } else {
      createTask.mutate(data, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-charcoal-800 rounded-sheet w-full max-w-md p-6 shadow-sheet max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-forest-700 dark:text-mint-300 mb-4">
          {task ? 'Edit Task' : 'New Task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
              placeholder="Add details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-1">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-1">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 text-forest-600 dark:text-mint-400 font-semibold hover:bg-mint-50 dark:hover:bg-charcoal-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-forest-600 text-white font-semibold hover:bg-forest-700 transition-colors"
            >
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
