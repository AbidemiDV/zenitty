export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  dueDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  dueDate?: string | null;
}

export interface TaskQueryParams {
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  sort?: 'dueDate' | 'priority' | 'createdAt';
}

export interface StatsResponse {
  today: number;
  overdue: number;
  all: number;
  completedThisWeek: number;
}

export interface ApiError {
  error: {
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}
