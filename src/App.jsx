import { useState } from 'react';
import { useTasksApi } from './hooks/useTasksApi';
import ToDoContext from './Context';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TasksList from './components/TasksList';
import Filters from './components/Filters';
import Footer from './components/Footer';
import './App.css';

function App() {
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
  } = useTasksApi();

  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isDone;
    if (filter === 'done') return task.isDone;
    return true;
  });

  if (loading) return <h1>Загрузка...</h1>;
  if (error) return <h1>Ошибка: {error.message}</h1>;

  return (
    <ToDoContext.Provider
      value={{
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
}

export default App;
