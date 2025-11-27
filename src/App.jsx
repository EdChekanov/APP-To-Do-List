import { useEffect, useState } from 'react';
import './App.css';
import ToDoContext from './Context';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TasksList from './components/TasksList';
import Filters from './components/Filters';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || [
      { id: 1, title: 'Выучить react', isDone: false },
      { id: 2, title: 'Сдать 2-й чек-лист', isDone: false },
    ]
  );

  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isDone;
    if (filter === 'done') return task.isDone;
    return true;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ToDoContext.Provider
      value={{
        tasks,
        setTasks,
        filter,
        setFilter,
        filteredTasks,
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
