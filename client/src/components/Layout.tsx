import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useDarkMode } from '../hooks/useDarkMode';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggle } = useDarkMode();

  return (
    <div className="min-h-screen bg-mint-100 dark:bg-charcoal-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-[248px]">
        <Outlet context={{ theme, onThemeToggle: toggle, onMenuClick: () => setSidebarOpen(true) }} />
      </div>
    </div>
  );
}
