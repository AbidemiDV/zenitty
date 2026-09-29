import { useTasks } from '../hooks/useTasks';
import type { TaskQueryParams } from '../types';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import DeleteConfirm from './DeleteConfirm';
import { useState } from 'react';
import type { Task } from '../types';

interface TaskListProps {
  params?: TaskQueryParams;
  dateFilter?: { dueToday?: boolean; overdue?: boolean };
}

export default function TaskList({ params, dateFilter }: TaskListProps) {
  const { data: tasks, isLoading, error } = useTasks(params);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const filteredTasks = tasks?.filter((task) => {
    if (!dateFilter) return true;
    if (dateFilter.dueToday) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      return due >= today && due < tomorrow && task.status !== 'COMPLETED';
    }
    if (dateFilter.overdue) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      return due < today && task.status !== 'COMPLETED';
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load tasks</p>
      </div>
    );
  }

  if (!filteredTasks || filteredTasks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-forest-500 dark:text-mint-500">No tasks found</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => {
              setEditingTask(task);
              setShowForm(true);
            }}
            onDelete={() => setDeletingTask(task)}
          />
        ))}
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {deletingTask && (
        <DeleteConfirm
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
        />
      )}
    </>
  );
}
