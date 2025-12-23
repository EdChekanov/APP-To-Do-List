import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './/Header';
import InputTask from './InputTask';
import TasksList from './TasksList';
import Filters from './Filters';
import Footer from './Footer';
import { getTasks } from '../redux/api/tasksApi';

const Todo = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  if (error) return <h1>Ошибка: {error.message}</h1>;

  return (
    <div className="wrapper">
      <Header />
      <InputTask />
      <TasksList />
      <Filters />
      <Footer />
    </div>
  );
};

export default Todo;
