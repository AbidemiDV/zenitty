import { useState } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../types';
import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { X, Trash2 } from 'lucide-react';

interface TaskDetailPanelProps {
  task: Task;
  onClose: () => void;
}

const categories = ['Work', 'Personal', 'Health', 'Shopping', 'Other'];
const priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

export default function TaskDetailPanel({ task, onClose }: TaskDetailPanelProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [category, setCategory] = useState(task.category);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );

  const handleSave = () => {
    updateTask.mutate(
      {
        id: task.id,
        data: {
          title: title.trim(),
          description: description.trim() || null,
          status,
          priority,
          category,
          dueDate: dueDate || null,
        },
      },
      { onSuccess: onClose }
    );
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-[360px] bg-white dark:bg-charcoal-800 h-full overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white dark:bg-charcoal-800 px-6 py-4 border-b border-mint-100 dark:border-charcoal-700 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-forest-700 dark:text-mint-300">
            Task detail
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-mint-50 dark:hover:bg-charcoal-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-forest-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
              Task name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-input border border-input-border bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-input border border-input-border bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-4 py-2.5 rounded-input border border-input-border bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value="TODO">To do</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-input border border-input-border bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
              Priority
            </label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2.5 rounded-input text-sm font-bold transition-colors ${
                    priority === p
                      ? 'bg-forest-600 text-white'
                      : 'bg-mint-50 dark:bg-charcoal-700 text-forest-500 hover:bg-mint-100'
                  }`}
                >
                  {p.charAt(0) + p.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
              Due date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-input border border-input-border bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-charcoal-800 px-6 py-4 border-t border-mint-100 dark:border-charcoal-700 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-button bg-forest-600 text-white text-sm font-bold hover:bg-forest-700 transition-colors"
          >
            Save changes
          </button>
          <button
            onClick={handleDelete}
            className="p-3 rounded-button border border-red-200 text-danger hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
