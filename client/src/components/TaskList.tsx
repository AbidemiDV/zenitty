import { useTasks } from '../hooks/useTasks';
import type { TaskQueryParams } from '../types';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import DeleteConfirm from './DeleteConfirm';
import { useState } from 'react';
import type { Task } from '../types';

interface TaskListProps {
  params?: TaskQueryParams;
}

export default function TaskList({ params }: TaskListProps) {
  const { data: tasks, isLoading, error } = useTasks(params);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

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

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-forest-500 dark:text-mint-500">No tasks yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task) => (
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
