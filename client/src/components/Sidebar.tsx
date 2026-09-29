import { NavLink } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const categories = ['All', 'Work', 'Personal', 'Health', 'Shopping', 'Other'];

export default function Sidebar({ open, onClose }: SidebarProps) {
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
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-charcoal-800 border-r border-mint-200 dark:border-charcoal-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-extrabold text-forest-600 dark:text-mint-400">
            Zenitty
          </h1>
        </div>
        <nav className="px-4" aria-label="Categories">
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <NavLink
                  to={cat === 'All' ? '/' : `/?category=${cat}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-mint-200 text-forest-700 dark:bg-charcoal-700 dark:text-mint-300'
                        : 'text-forest-600 hover:bg-mint-50 dark:text-mint-400 dark:hover:bg-charcoal-700'
                    }`
                  }
                >
                  {cat}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
