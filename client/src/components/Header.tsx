interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
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
        <div>
          <h2 className="text-lg font-bold text-forest-700 dark:text-mint-300">
            Hello, User
          </h2>
          <p className="text-sm text-forest-500 dark:text-mint-500">{today}</p>
        </div>
      </div>
    </header>
  );
}
