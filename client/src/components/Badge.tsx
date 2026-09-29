import type { TaskPriority } from '../types';

interface BadgeProps {
  label: string;
  variant: 'priority' | 'category';
  value: string;
}

const priorityStyles: Record<TaskPriority, string> = {
  HIGH: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  MEDIUM: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  LOW: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
};

const categoryStyles: Record<string, string> = {
  Work: 'bg-mint-100 text-forest-600 dark:bg-charcoal-700 dark:text-mint-400',
  Personal: 'bg-lavender-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Health: 'bg-peach-100 text-peach-300 dark:bg-peach-300/20 dark:text-peach-300',
  Shopping: 'bg-sage-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Other: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function Badge({ label, variant, value }: BadgeProps) {
  const styles = variant === 'priority' ? priorityStyles[value as TaskPriority] : categoryStyles[value] || categoryStyles.Other;

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles}`}>
      {label}
    </span>
  );
}
