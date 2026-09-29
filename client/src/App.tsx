import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StatsCards from './components/StatsCards';
import TaskList from './components/TaskList';
import type { TaskStatus, TaskQueryParams } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

export default function App() {
  const [filter, setFilter] = useState<TaskQueryParams>({});
  const [dateFilter, setDateFilter] = useState<{ dueToday?: boolean; overdue?: boolean }>({});

  const handleStatsFilter = (newFilter: { status?: TaskStatus; dueToday?: boolean; overdue?: boolean }) => {
    if (newFilter.status) {
      setFilter({ status: newFilter.status });
    } else if (newFilter.dueToday) {
      setFilter({});
      setDateFilter({ dueToday: true });
    } else if (newFilter.overdue) {
      setFilter({});
      setDateFilter({ overdue: true });
    } else {
      setFilter({});
      setDateFilter({});
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <div className="space-y-6">
                  <StatsCards onFilter={handleStatsFilter} />
                  <TaskList params={filter} dateFilter={dateFilter} />
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
