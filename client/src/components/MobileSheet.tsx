import { useEffect } from 'react';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function MobileSheet({ isOpen, onClose, title, children }: MobileSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] bg-white dark:bg-charcoal-800 rounded-t-sheet overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-charcoal-800 px-6 py-4 border-b border-mint-200 dark:border-charcoal-700 flex items-center justify-between">
          <h2 className="text-lg font-bold text-forest-700 dark:text-mint-300">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-mint-100 dark:hover:bg-charcoal-700 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-forest-600 dark:text-mint-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
