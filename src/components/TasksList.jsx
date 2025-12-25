import { useEffect, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Task from './Task';

const TasksList = () => {
  const {
    value: tasks,
    filter,
    loading,
  } = useSelector(
    (store) => ({
      value: store.tasks.value,
      filter: store.tasks.filter,
      loading: store.tasks.loading,
    }),
    shallowEqual
  );

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.isCompleted);
    if (filter === 'done') return tasks.filter((task) => task.isCompleted);
    return tasks;
  }, [tasks, filter]);

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
      {loading && <li className="loading-item">Загрузка...</li>}
      {filteredTasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </ul>
  );
};

export default TasksList;
