import { useStats } from '../hooks/useStats';
import type { TaskStatus } from '../types';

interface StatsCardsProps {
  onFilter: (filter: { status?: TaskStatus; dueToday?: boolean; overdue?: boolean }) => void;
}

export default function StatsCards({ onFilter }: StatsCardsProps) {
  const { data: stats, isLoading } = useStats();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[118px] lg:h-[150px] rounded-card bg-mint-200 dark:bg-charcoal-700 animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: 'Due today',
      value: stats.today,
      bg: 'bg-mint-300 dark:bg-forest-600',
      text: 'text-forest-700 dark:text-white',
      onClick: () => onFilter({ dueToday: true }),
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      bg: 'bg-peach-100 dark:bg-peach-300/20',
      text: 'text-peach-300 dark:text-peach-300',
      onClick: () => onFilter({ overdue: true }),
    },
    {
      label: 'All tasks',
      value: stats.all,
      bg: 'bg-sage-100 dark:bg-forest-500/20',
      text: 'text-forest-600 dark:text-mint-400',
      onClick: () => onFilter({}),
    },
    {
      label: 'Completed this week',
      value: stats.completedThisWeek,
      bg: 'bg-lavender-100 dark:bg-lavender-300/20',
      text: 'text-purple-700 dark:text-lavender-300',
      onClick: () => onFilter({ status: 'COMPLETED' }),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <button
          key={card.label}
          onClick={card.onClick}
          className={`${card.bg} rounded-card p-4 md:p-6 text-left transition-transform hover:scale-[1.02] active:scale-[0.98] h-[118px] lg:h-[150px] flex flex-col justify-between`}
        >
          <p className={`text-sm font-bold ${card.text} opacity-80`}>
            {card.label}
          </p>
          <p className={`text-stat-mobile lg:text-stat ${card.text}`}>
            {card.value}
          </p>
        </button>
      ))}
    </div>
  );
}
