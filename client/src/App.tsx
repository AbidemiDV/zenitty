import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import StatsCards from './components/StatsCards';
import SearchFilterBar from './components/SearchFilterBar';
import TaskList from './components/TaskList';
import FloatingActionButton from './components/FloatingActionButton';
import MobileSheet from './components/MobileSheet';
import FilterSheet from './components/FilterSheet';
import TaskForm from './components/TaskForm';
import type { TaskStatus, TaskPriority, TaskQueryParams } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateFilter, setDateFilter] = useState<{ dueToday?: boolean; overdue?: boolean }>({});
  const [showAddTask, setShowAddTask] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <div className="space-y-6">
      <StatsCards onFilter={handleStatsFilter} />

      {/* Desktop filter bar */}
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

      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="w-full py-3 rounded-card bg-white dark:bg-charcoal-800 shadow-card text-forest-600 dark:text-mint-400 font-semibold flex items-center justify-center gap-2 min-h-[44px]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters & Sort
        </button>
      </div>

      <TaskList params={taskParams} dateFilter={dateFilter} />

      <FloatingActionButton onClick={() => setShowAddTask(true)} />

      <MobileSheet isOpen={showAddTask} onClose={() => setShowAddTask(false)} title="New Task">
        <TaskForm onClose={() => setShowAddTask(false)} />
      </MobileSheet>

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
