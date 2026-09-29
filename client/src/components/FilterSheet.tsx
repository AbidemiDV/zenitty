import type { TaskStatus, TaskPriority } from '../types';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  status: TaskStatus | '';
  onStatusChange: (value: TaskStatus | '') => void;
  priority: TaskPriority | '';
  onPriorityChange: (value: TaskPriority | '') => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

const categories = ['All', 'Work', 'Personal', 'Health', 'Shopping', 'Other'];

export default function FilterSheet({
  isOpen,
  onClose,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: FilterSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-charcoal-800 rounded-t-sheet p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-forest-700 dark:text-mint-300">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-mint-100 dark:hover:bg-charcoal-700 transition-colors"
            aria-label="Close filters"
          >
            <svg className="w-5 h-5 text-forest-600 dark:text-mint-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {['', 'TODO', 'IN_PROGRESS', 'COMPLETED'].map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(s as TaskStatus | '')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${
                  status === s
                    ? 'bg-forest-600 text-white'
                    : 'bg-mint-100 dark:bg-charcoal-700 text-forest-600 dark:text-mint-400'
                }`}
              >
                {s === '' ? 'All' : s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-2">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {['', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
              <button
                key={p}
                onClick={() => onPriorityChange(p as TaskPriority | '')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${
                  priority === p
                    ? 'bg-forest-600 text-white'
                    : 'bg-mint-100 dark:bg-charcoal-700 text-forest-600 dark:text-mint-400'
                }`}
              >
                {p === '' ? 'All' : p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => onCategoryChange(c === 'All' ? '' : c)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${
                  (c === 'All' && category === '') || category === c
                    ? 'bg-forest-600 text-white'
                    : 'bg-mint-100 dark:bg-charcoal-700 text-forest-600 dark:text-mint-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-forest-600 dark:text-mint-400 mb-2">
            Sort By
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'createdAt', label: 'Newest' },
              { value: 'dueDate', label: 'Due Date' },
              { value: 'priority', label: 'Priority' },
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => onSortChange(s.value)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${
                  sort === s.value
                    ? 'bg-forest-600 text-white'
                    : 'bg-mint-100 dark:bg-charcoal-700 text-forest-600 dark:text-mint-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
