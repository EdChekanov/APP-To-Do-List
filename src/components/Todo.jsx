import { useEffect, useState } from 'react';
import { useTasksApi } from '../hooks/useTasksApi';
import Header from './/Header';
import InputTask from './InputTask';
import TasksList from './TasksList';
import Filters from './Filters';
import Footer from './Footer';
import ToDoContext from '../Context';

const Todo = () => {
  const {
    tasks,
    loading,
    error,
    setTasks,
    handleAddTask,
    handleComplete,
    handleDelete,
    handleDeleteCompleted,
    handleEdit,
    handleLogin,
    handleRegister,
    successRegistered,
    fetchTasks,
  } = useTasksApi();

  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'done') return task.isCompleted;
    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) return <h1>Загрузка...</h1>;
  if (error) return <h1>Ошибка: {error.response.body.message}</h1>;

  return (
    <ToDoContext.Provider
      value={{
        error,
        tasks,
        setTasks,
        filter,
        setFilter,
        filteredTasks,
        handleAddTask,
        handleComplete,
        handleDelete,
        handleDeleteCompleted,
        handleEdit,
        handleLogin,
        handleRegister,
        successRegistered,
      }}
    >
      <div className="wrapper">
        <Header />
        <InputTask />
        <TasksList />
        <Filters />
        <Footer />
      </div>
    </ToDoContext.Provider>
  );
};

export default Todo;
