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
          <li key={task.id} className="task-item">
            <Task task={task} />
          </li>
        ))
      )}
    </ul>
  );
};

export default TasksList;
