import { useContext } from 'react';
import ToDoContext from '../Context';
import Task from './Task';

const TasksList = () => {
  const { filteredTasks } = useContext(ToDoContext);

  return (
    <ul className="task-list">
      {!filteredTasks.length ? (
        <li>Пусто </li>
      ) : (
        filteredTasks.map((task) => (
          <span key={task.id}>
            <Task task={task} />
          </span>
        ))
      )}
    </ul>
  );
};

export default TasksList;
