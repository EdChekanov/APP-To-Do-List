import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export function useTasksApi() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get();
      setTasks(data);
    } catch (err) {
      setTasks([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddTask = useCallback(async (inputText) => {
    try {
      const response = await api.post('', { title: inputText });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Ошибка добавления:', error);
      throw error;
    }
  }, []);

  const handleComplete = useCallback(async (id) => {
    await api.patch(`/${id}/isCompleted`);
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }, []);

  const handleDelete = useCallback(async (id) => {
    await api.delete(`/${id}`);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }, []);

  const handleDeleteCompleted = () => {
    tasks.forEach(async (task) => {
      if (task.isCompleted) api.delete(`/${task.id}`);
    });
    setTasks((tasks) => tasks.filter((task) => !task.isCompleted));
  };

  const handleEdit = useCallback(async (id, newTitle) => {
    await api.patch(`/${id}`, { title: newTitle });
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) return { ...task, title: newTitle };
        return task;
      })
    );
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    setTasks,
    refetch: fetchTasks,
    handleAddTask,
    handleComplete,
    handleDelete,
    handleDeleteCompleted,
    handleEdit,
  };
}
