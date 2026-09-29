import { useState } from 'react';
import { useCreateTask } from '../hooks/useTasks';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { TaskPriority } from '../types';

interface MobileAddTaskProps {
  onBack: () => void;
}

const categories = ['Work', 'Personal', 'Health', 'Shopping', 'Other'];
const priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

export default function MobileAddTask({ onBack }: MobileAddTaskProps) {
  const createTask = useCreateTask();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    createTask.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        category,
        dueDate: dueDate || undefined,
      },
      { onSuccess: onBack }
    );
  };

  return (
    <div className="min-h-screen bg-mint-100 dark:bg-charcoal-900">
      <div className="flex items-center gap-4 p-4">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-forest-600 flex items-center justify-center text-white"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-extrabold text-forest-700 dark:text-mint-300">
          Add new task
        </h1>
      </div>

      <div className="px-4 pb-24">
        <div className="bg-white dark:bg-charcoal-800 rounded-card p-6 shadow-card space-y-5">
          <div>
            <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
              Task name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="w-full px-4 py-3 rounded-input border border-input-border bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details"
              rows={3}
              className="w-full px-4 py-3 rounded-input border border-input-border bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
            />
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
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    category === cat
                      ? 'bg-forest-600 text-white'
                      : 'bg-mint-50 dark:bg-charcoal-700 text-forest-500 hover:bg-mint-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-forest-600 dark:text-mint-400 mb-1.5">
              Due date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" />
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-input border border-input-border bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-mint-100 dark:bg-charcoal-900">
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-button bg-forest-600 text-white text-sm font-bold hover:bg-forest-700 transition-colors"
        >
          Create task
        </button>
      </div>
    </div>
  );
}
