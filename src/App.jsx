import { useState } from 'react';
import './App.css';
import ToDoContext from './Context';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TasksList from './components/TasksList';
import Filters from './components/Filters';
import Footer from './components/Footer';

function App() {
  const [filter, setFilter] = useState('all');

  return (
    <ToDoContext.Provider
      value={{
        filter,
        setFilter,
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
