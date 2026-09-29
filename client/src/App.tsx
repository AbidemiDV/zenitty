import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useSearchParams, useOutletContext } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SearchFilterBar from './components/SearchFilterBar';
import TaskList from './components/TaskList';
import TaskDetailPanel from './components/TaskDetailPanel';
import FloatingActionButton from './components/FloatingActionButton';
import MobileSheet from './components/MobileSheet';
import FilterSheet from './components/FilterSheet';
import MobileAddTask from './components/MobileAddTask';
import MobileTaskDetail from './components/MobileTaskDetail';
import TaskForm from './components/TaskForm';
import type { TaskStatus, TaskPriority, TaskQueryParams, Task } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

interface LayoutContext {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onMenuClick: () => void;
}

function Dashboard() {
  const { theme, onThemeToggle, onMenuClick } = useOutletContext<LayoutContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateFilter, setDateFilter] = useState<{ dueToday?: boolean; overdue?: boolean }>({});
  const [showAddTask, setShowAddTask] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showMobileAdd, setShowMobileAdd] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const search = searchParams.get('search') || '';
  const status = (searchParams.get('status') as TaskStatus) || '';
  const priority = (searchParams.get('priority') as TaskPriority) || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'createdAt';

  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const handleStatsFilter = (newFilter: { status?: TaskStatus; dueToday?: boolean; overdue?: boolean }) => {
    if (newFilter.status) {
      updateParams({ status: newFilter.status });
      setDateFilter({});
    } else if (newFilter.dueToday) {
      updateParams({ status: '' });
      setDateFilter({ dueToday: true });
    } else if (newFilter.overdue) {
      updateParams({ status: '' });
      setDateFilter({ overdue: true });
    } else {
      updateParams({ status: '' });
      setDateFilter({});
    }
  };

  const taskParams: TaskQueryParams = {
    ...(search && { search }),
    ...(status && { status }),
    ...(priority && { priority }),
    ...(category && { category }),
    ...(sort && { sort: sort as 'dueDate' | 'priority' | 'createdAt' }),
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    if (window.innerWidth < 768) {
      setShowMobileDetail(true);
    }
  };

  return (
    <div>
      <Header
        onMenuClick={onMenuClick}
        theme={theme}
        onThemeToggle={onThemeToggle}
        onAddTask={() => setShowAddTask(true)}
        search={search}
        onSearchChange={(v) => updateParams({ search: v })}
      />

      <div className="space-y-6">
        <StatsCards onFilter={handleStatsFilter} />

        <div className="hidden lg:block">
          <SearchFilterBar
            search={search}
            onSearchChange={(v) => updateParams({ search: v })}
            status={status}
            onStatusChange={(v) => updateParams({ status: v })}
            priority={priority}
            onPriorityChange={(v) => updateParams({ priority: v })}
            category={category}
            onCategoryChange={(v) => updateParams({ category: v })}
            sort={sort}
            onSortChange={(v) => updateParams({ sort: v })}
          />
        </div>

        <div className="lg:hidden">
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => updateParams({ search: e.target.value })}
              placeholder="Search tasks"
              className="w-full pl-10 pr-4 py-3 rounded-input border border-input-border bg-white dark:bg-charcoal-800 text-forest-700 dark:text-mint-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              aria-label="Search tasks"
            />
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="w-full py-3 rounded-card bg-white dark:bg-charcoal-800 shadow-card text-forest-600 dark:text-mint-400 font-semibold flex items-center justify-center gap-2 min-h-[44px] mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters & Sort
          </button>
        </div>

        <TaskList
          params={taskParams}
          dateFilter={dateFilter}
          selectedTaskId={selectedTask?.id}
          onSelectTask={handleSelectTask}
        />

        <FloatingActionButton onClick={() => setShowMobileAdd(true)} />

        {/* Desktop add task modal */}
        <MobileSheet isOpen={showAddTask} onClose={() => setShowAddTask(false)} title="Add new task">
          <TaskForm onClose={() => setShowAddTask(false)} />
        </MobileSheet>

        {/* Mobile add task full screen */}
        {showMobileAdd && (
          <MobileAddTask onBack={() => setShowMobileAdd(false)} />
        )}

        {/* Mobile task detail full screen */}
        {showMobileDetail && selectedTask && (
          <MobileTaskDetail task={selectedTask} onBack={() => setShowMobileDetail(false)} />
        )}

        {/* Desktop task detail panel */}
        {selectedTask && window.innerWidth >= 1024 && (
          <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
        )}

        <FilterSheet
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          status={status}
          onStatusChange={(v) => updateParams({ status: v })}
          priority={priority}
          onPriorityChange={(v) => updateParams({ priority: v })}
          category={category}
          onCategoryChange={(v) => updateParams({ category: v })}
          sort={sort}
          onSortChange={(v) => updateParams({ sort: v })}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
