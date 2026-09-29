import type { Task, CreateTaskInput, UpdateTaskInput, TaskQueryParams, StatsResponse, ApiError } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = (await res.json()) as ApiError;
    throw new Error(body.error.message || 'Request failed');
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function getTasks(params?: TaskQueryParams): Promise<Task[]> {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set('search', params.search);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.priority) searchParams.set('priority', params.priority);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.sort) searchParams.set('sort', params.sort);

  const query = searchParams.toString();
  return request<Task[]>(`/api/tasks${query ? `?${query}` : ''}`);
}

export function getTask(id: string): Promise<Task> {
  return request<Task>(`/api/tasks/${id}`);
}

export function createTask(data: CreateTaskInput): Promise<Task> {
  return request<Task>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateTask(id: string, data: UpdateTaskInput): Promise<Task> {
  return request<Task>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteTask(id: string): Promise<void> {
  return request<void>(`/api/tasks/${id}`, { method: 'DELETE' });
}

export function getStats(): Promise<StatsResponse> {
  return request<StatsResponse>('/api/stats');
}
