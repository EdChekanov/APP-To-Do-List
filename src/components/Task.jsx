import { useContext } from 'react';
import ToDoContext from '../Context';

const Task = ({ task }) => {
  const { setTasks } = useContext(ToDoContext);

  const handleClickComplete = (id) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleClickDelete = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <input
        id={task.id}
        type="checkbox"
        onChange={() => handleClickComplete(task.id)}
        checked={task.isDone}
      />
      <label className={task.isDone ? 'done' : ''} htmlFor={task.id}>
        <p>{task.title}</p>
      </label>
      <button onClick={() => handleClickDelete(task.id)}>X</button>
    </>
  );
};

export default Task;
