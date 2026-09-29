import { Search, Plus, Moon, Sun } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

interface HeaderProps {
  onMenuClick: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onAddTask: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Header({
  onMenuClick,
  theme,
  onThemeToggle,
  onAddTask,
  search,
  onSearchChange,
}: HeaderProps) {
  const { data: tasks } = useTasks();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const tasksDueToday = tasks?.filter((task) => {
    if (!task.dueDate || task.status === 'COMPLETED') return false;
    const due = new Date(task.dueDate);
    const now = new Date();
    return due.toDateString() === now.toDateString();
  }).length || 0;

  return (
    <header className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-mint-200 dark:hover:bg-charcoal-700 transition-colors"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-forest-600 dark:text-mint-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center text-white font-bold text-sm">
          J
        </div>
        <div>
          <h2 className="text-greeting-mobile lg:text-greeting text-forest-700 dark:text-mint-300">
            Hello, Johnny
          </h2>
          <p className="text-meta text-forest-400 dark:text-mint-600">
            {today} &middot; {tasksDueToday} tasks due today
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks"
            className="w-[300px] pl-10 pr-4 py-2.5 rounded-input border border-input-border bg-white dark:bg-charcoal-800 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
            aria-label="Search tasks"
          />
        </div>

        <button
          onClick={onAddTask}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-button bg-forest-600 text-white text-sm font-bold hover:bg-forest-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add task
        </button>

        <button
          onClick={onThemeToggle}
          className="p-2.5 rounded-xl hover:bg-mint-200 dark:hover:bg-charcoal-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-mint-400" />
          ) : (
            <Moon className="w-5 h-5 text-forest-600" />
          )}
        </button>
      </div>
    </header>
  );
}
