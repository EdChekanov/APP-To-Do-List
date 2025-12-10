import { useState, useCallback } from 'react';
import api from '../api/axios';

export function useTasksApi() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/todos');
      setTasks(data);
    } catch (error) {
      setTasks([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddTask = useCallback(async (inputText) => {
    try {
      const response = await api.post('/todos', { title: inputText });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Ошибка добавления:', error);
      setError(error);
    }
  }, []);

  const handleComplete = useCallback(async (id) => {
    try {
      await api.patch(`/todos/${id}/isCompleted`);
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    } catch (error) {
      console.error('Ошибка изменения состояния задания:', error);
      setError(error);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Ошибка удаления задания:', error);
      setError(error);
    }
  }, []);

  const handleDeleteCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.isCompleted);

    try {
      await Promise.all(
        completedTasks.map((task) => api.delete(`/todos/${task.id}`))
      );
      setTasks((tasks) => tasks.filter((task) => !task.isCompleted));
    } catch (error) {
      console.error(
        'Ошибка при удалении некоторых завершенных заданий:',
        error
      );
      setError(error);
    }
  };

  const handleEdit = useCallback(async (id, newTitle) => {
    try {
      await api.patch(`/todos/${id}`, { title: newTitle });
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === id) return { ...task, title: newTitle };
          return task;
        })
      );
    } catch (error) {
      console.error('Ошибка изменения задания:', error);
      setError(error);
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    setTasks,
    fetchTasks,
    handleAddTask,
    handleComplete,
    handleDelete,
    handleDeleteCompleted,
    handleEdit,
  };
}
