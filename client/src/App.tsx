import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import StatsCards from './components/StatsCards';
import SearchFilterBar from './components/SearchFilterBar';
import TaskList from './components/TaskList';
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
      <TaskList params={taskParams} dateFilter={dateFilter} />
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
