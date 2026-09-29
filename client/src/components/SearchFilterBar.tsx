import type { TaskStatus, TaskPriority } from '../types';

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
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

export default function SearchFilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: SearchFilterBarProps) {
  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-card p-4 shadow-card space-y-4">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
          aria-label="Search tasks"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as TaskStatus | '')}
          className="px-3 py-2 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value as TaskPriority | '')}
          className="px-3 py-2 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
          aria-label="Filter by priority"
        >
          <option value="">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === 'All' ? '' : cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 rounded-xl border border-mint-200 dark:border-charcoal-600 bg-white dark:bg-charcoal-700 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
          aria-label="Sort tasks"
        >
          <option value="createdAt">Newest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}
