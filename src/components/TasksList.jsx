import { useContext } from 'react';
import ToDoContext from '../Context';
import Task from './Task';
import { LiaFrownOpen } from 'react-icons/lia';

const TasksList = () => {
  const { filteredTasks } = useContext(ToDoContext);

  if (!filteredTasks.length)
    return (
      <ul className="task-list">
        <li>
          Пусто <LiaFrownOpen />
        </li>
      </ul>
    );

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <span key={task.id}>
          <Task task={task} />
        </span>
      ))}
    </ul>
  );
};

export default TasksList;
