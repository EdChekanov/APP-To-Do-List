import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ToDoContext from '../Context';
import Task from './Task';

const TasksList = () => {
  const tasks = useSelector((store) => store.tasks.value);
  const { filter } = useContext(ToDoContext);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isDone;
    if (filter === 'done') return task.isDone;
    return true;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  if (!filteredTasks.length)
    return (
      <ul className="task-list">
        <li>Пусто </li>
      </ul>
    );

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => {
        return (
          <span key={task.id}>
            <Task task={task} />
          </span>
        );
      })}
    </ul>
  );
};

export default TasksList;
