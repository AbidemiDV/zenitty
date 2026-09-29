import { NavLink } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { useDarkMode } from '../hooks/useDarkMode';
import { LayoutDashboard, ListTodo, Calendar, CheckCircle, Moon, Sun } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/?status=TODO', label: 'All tasks', icon: ListTodo },
  { to: '/?dueToday=true', label: 'Today', icon: Calendar },
  { to: '/?status=COMPLETED', label: 'Completed', icon: CheckCircle },
];

const categories = [
  { name: 'Work', color: 'bg-forest-600' },
  { name: 'Personal', color: 'bg-lavender-300' },
  { name: 'Health', color: 'bg-peach-300' },
  { name: 'Shopping', color: 'bg-yellow-500' },
  { name: 'Other', color: 'bg-gray-400' },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { data: tasks } = useTasks();
  const { theme, toggle } = useDarkMode();

  const categoryCounts = tasks?.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[248px] bg-white dark:bg-charcoal-800 border-r border-mint-200 dark:border-charcoal-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-forest-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-forest-700 dark:text-mint-300">
              Zenitty
            </span>
          </div>
        </div>

        <nav className="px-4" aria-label="Main navigation">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-forest-600 text-white'
                        : 'text-forest-600 hover:bg-mint-50 dark:text-mint-400 dark:hover:bg-charcoal-700'
                    }`
                  }
                >
                  <item.icon className="w-4.5 h-4.5" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 mt-8">
          <p className="text-section uppercase text-forest-400 dark:text-mint-600 mb-3">
            Categories
          </p>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.name}>
                <NavLink
                  to={`/?category=${cat.name}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-2 rounded-xl text-sm font-semibold text-forest-600 hover:bg-mint-50 dark:text-mint-400 dark:hover:bg-charcoal-700 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                    {cat.name}
                  </span>
                  <span className="text-xs text-forest-400 dark:text-mint-600">
                    {categoryCounts[cat.name] || 0}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={toggle}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-forest-600 hover:bg-mint-50 dark:text-mint-400 dark:hover:bg-charcoal-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>
    </>
  );
}
