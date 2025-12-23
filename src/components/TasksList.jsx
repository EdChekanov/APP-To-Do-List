import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';

const TasksList = () => {
  const { value: tasks, filter, loading } = useSelector((store) => store.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'done') return task.isCompleted;
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

  if (loading)
    return (
      <ul className="task-list">
        <li>Загрузка...</li>
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
