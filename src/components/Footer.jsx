import { useContext } from 'react';
import ToDoContext from '../Context';

const Footer = () => {
  const { tasks, setTasks } = useContext(ToDoContext);

  const handleClick = () => {
    setTasks((tasks) => tasks.filter((task) => !task.isDone));
  };

  return (
    <div className="footer">
      <p>Осталоcь дел: {tasks.filter((task) => !task.isDone).length}</p>
      <button className="footer-btn" onClick={handleClick}>
        Удалить завершенные дела
      </button>
    </div>
  );
};

export default Footer;
